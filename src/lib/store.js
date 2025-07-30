import { writable } from "svelte/store";
import { browser } from "$app/environment";

let fileTreeData = [];
let currentLogData = [];
let filesData = {};

if (browser) {
	const storedFileTree = localStorage.getItem('fileTree');
	const storedCurrentLog = localStorage.getItem('currentLog');
	const storedFiles = localStorage.getItem('files');
    if (storedFileTree) {
		fileTreeData = JSON.parse(storedFileTree);
    }
    if (storedCurrentLog) {
		currentLogData = JSON.parse(storedCurrentLog);
    }
    if (storedFiles) {
		filesData = JSON.parse(storedFiles);
    }

}
export const fileTree = writable(fileTreeData);
export const filesList = writable(filesData);
export const currentLog = writable(currentLogData);
export let shouldPreview = writable(false);

if (browser) {
	fileTree.subscribe((value) => {
		localStorage.setItem('fileTree', JSON.stringify(value));
	});
	currentLog.subscribe((value) => {
		localStorage.setItem('currentLog', JSON.stringify(value));
	});
	filesList.subscribe((value) => {
		localStorage.setItem('files', JSON.stringify(value));
	});

}