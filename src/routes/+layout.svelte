<script lang="ts">
	import '../app.css';

	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';
	import { fileTree, currentLog, shouldPreview, filesList } from '$lib/store';

	import { Eye, PenLine, Trash2 } from '@lucide/svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';

	import { ModeWatcher, setMode } from 'mode-watcher';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	let { children } = $props();

	let nowRaw: Date;
	onMount(() => {
		setMode('dark');
		nowRaw = new Date();
		currentLog.set([]);
	});

	let disableDelete = $state(true);
	$effect(() => {
		if ($currentLog.length < 1) {
			disableDelete = false;
		} else {
			disableDelete = true;
		}
	});

	function addLog() {
		const nowRaw = new Date();
		const now = {
			year: nowRaw.getFullYear().toString(),
			month: nowRaw.toLocaleString('en-US', { month: 'long' }),
			day: nowRaw.getDate().toString(),
			time: nowRaw.toLocaleTimeString('en-GB', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false
			})
		};

		const timestamp = `${now.time}_${now.year}_${now.month}_${now.day}`;
		currentLog.update((updatedCurrentLog) => {
			updatedCurrentLog = [now.time, now.year, now.month, now.day];
			return updatedCurrentLog;
		});

		fileTree.update((current) => {
			// Find year
			let yearEntry = current.find((entry) => entry[0] === now.year);
			if (!yearEntry) {
				// Year not found, create it
				yearEntry = [now.year];
				current.push(yearEntry);
			}

			// Find month within year
			let monthEntry = yearEntry.find((e) => Array.isArray(e) && e[0] === now.month);
			if (!monthEntry) {
				monthEntry = [now.month];
				yearEntry.push(monthEntry);
			}

			// Find day within month
			let dayEntry = monthEntry.find((e) => Array.isArray(e) && e[0] === now.day);
			if (!dayEntry) {
				dayEntry = [now.day];
				monthEntry.push(dayEntry);
			}

			// Add time if not already present
			if (!dayEntry.includes(timestamp)) {
				dayEntry.push(timestamp);
			}

			return current;
		});
	}
	function deleteLog(targetYear, targetMonth, targetDay, targetTime) {
		let currentFile = `${$currentLog[1]}_${$currentLog[2]}_${$currentLog[3]}_${$currentLog[0]}`;
		currentLog.set([]);
		const targetFullTime = `${targetTime}_${targetYear}_${targetMonth}_${targetDay}`;


		filesList.update((currentFilesList) => {
			delete currentFilesList[currentFile];
			return currentFilesList;
		});

		fileTree.update((current) => {
			return current.map((yearEntry) => {
				if (yearEntry[0] === targetYear) {
					const updatedYear = [yearEntry[0]];

					for (let i = 1; i < yearEntry.length; i++) {
						const monthEntry = yearEntry[i];
						if (monthEntry[0] === targetMonth) {
							const updatedMonth = [monthEntry[0]];

							for (let j = 1; j < monthEntry.length; j++) {
								const dayEntry = monthEntry[j];
								if (dayEntry[0] === targetDay) {
									const updatedDay = [
										dayEntry[0],
										...dayEntry.slice(1).filter((t) => t !== targetFullTime)
									];
									updatedMonth.push(updatedDay);
								} else {
									updatedMonth.push(dayEntry);
								}
							}

							updatedYear.push(updatedMonth);
						} else {
							updatedYear.push(monthEntry);
						}
					}

					return updatedYear;
				}

				return yearEntry;
			});
		});
	}
</script>

<ModeWatcher />
<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex h-12 w-full shrink-0 items-center gap-2 border-b px-4">
			<Sidebar.Trigger class="text-primary -ml-1" />
			<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
			<Breadcrumb.Root>
				<Breadcrumb.List>
					{#if $currentLog.length < 1}
						<Breadcrumb.Item class="hidden md:block">No Log Selected</Breadcrumb.Item>
					{:else}
						<Breadcrumb.Item class="hidden md:block">
							{$currentLog[1]}
						</Breadcrumb.Item>
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item class="hidden md:block">
							{$currentLog[2]}
						</Breadcrumb.Item>
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item class="hidden md:block">
							{$currentLog[3]}
						</Breadcrumb.Item>
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item class="hidden md:block">
							{$currentLog[0]}
						</Breadcrumb.Item>
					{/if}
				</Breadcrumb.List>
			</Breadcrumb.Root>
			{#if $shouldPreview == true}
				<Badge>Preview Mode</Badge>
			{:else}
				<Badge>Write Mode</Badge>
			{/if}
			<div class="ml-auto flex gap-1">
				<Button onclick={addLog}>Log</Button>
				<Button onclick={() => shouldPreview.set(false)}><PenLine /></Button>
				<Button onclick={() => shouldPreview.set(true)}><Eye /></Button>

				{#if disableDelete == true}
					<AlertDialog.Root>
						<AlertDialog.Trigger>
							<Button><Trash2 color="var(--destructive)" /></Button>
						</AlertDialog.Trigger>
						<AlertDialog.Content>
							<AlertDialog.Header>
								<AlertDialog.Title>Are you sure?</AlertDialog.Title>
								<AlertDialog.Description>
									This action cannot be undone. This will permanently delete this log as it becomes <span
										class="text-destructive">unrecoverable</span
									>
								</AlertDialog.Description>
							</AlertDialog.Header>
							<AlertDialog.Footer>
								<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
								<AlertDialog.Cancel
									onclick={() =>
										deleteLog($currentLog[1], $currentLog[2], $currentLog[3], $currentLog[0])}
									class="bg-destructive text-foreground">Delete</AlertDialog.Cancel
								>
							</AlertDialog.Footer>
						</AlertDialog.Content>
					</AlertDialog.Root>
				{/if}
			</div>
		</header>
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>
