<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import FileIcon from '@lucide/svelte/icons/file';
	import FolderIcon from '@lucide/svelte/icons/folder';
	import type { ComponentProps } from 'svelte';
	import { Button } from './ui/button';
	import Input from './ui/input/input.svelte';
	import SidebarMenuAction from './ui/sidebar/sidebar-menu-action.svelte';
	import { currentLog, fileTree } from '$lib/store';
	import { Trash2 } from '@lucide/svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	let data = $state({
		changes: [
			{
				file: 'README.md',
				state: 'M'
			},
			{
				file: 'routes/+page.svelte',
				state: 'U'
			},
			{
				file: 'routes/+layout.svelte',
				state: 'M'
			}
		],
		tree: $fileTree
	});
	$effect(() => {
		data.tree = $fileTree;
	});

	function handleMenuItemClicked(arr) {
		let year = arr[1];
		let month = arr[2];
		let day = arr[3];
		currentLog.set(arr);
	}
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Content class="overflow-x-hidden">
		<!-- <Sidebar.Group>
			<Sidebar.GroupAction>d</Sidebar.GroupAction>
			<Sidebar.GroupLabel>Changes</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each data.changes as item, index (index)}
						<Sidebar.MenuItem class="flex">
							<Sidebar.MenuButton>
								<FileIcon />
								{item.file}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group> -->
		<Sidebar.Group>
			<Sidebar.GroupLabel>Logs</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each data.tree as item, index (index)}
						{@render Tree({ item })}
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>

<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
{#snippet Tree({ item }: { item: string | any[] })}
	{@const [name, ...items] = Array.isArray(item) ? item : [item]}
	{#if !Array.isArray(item)}
		<!-- Primitive value, like a file -->
		<Sidebar.MenuButton
			onclick={() => handleMenuItemClicked(item.split('_').filter(Boolean))}
			class="data-[active=true]:bg-transparent"
		>
			<FileIcon />
			{item.split('_').filter(Boolean)[0]}
		</Sidebar.MenuButton>
	{:else if Array.isArray(item) && typeof name === 'string'}
		<!-- Always treat arrays as folders -->
		<Sidebar.MenuItem>
			<Collapsible.Root
				class="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
			>
				<Collapsible.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuButton {...props}>
							<ChevronRightIcon className="transition-transform" />
							<FolderIcon />
							{name}
						</Sidebar.MenuButton>
					{/snippet}
				</Collapsible.Trigger>
				<Collapsible.Content>
					<Sidebar.MenuSub class="w-full">
						{#each items as subItem, index (index)}
							{@render Tree({ item: subItem })}
						{/each}
					</Sidebar.MenuSub>
				</Collapsible.Content>
			</Collapsible.Root>
		</Sidebar.MenuItem>
	{/if}
{/snippet}