import { writable } from "svelte/store";
import { browser } from "$app/environment";

let fileTreeData = [];
let currentLogData = [];

if (browser) {
	const storedFileTree = localStorage.getItem('fileTree');
	const storedCurrentLog = localStorage.getItem('currentLog');

    if (storedFileTree) {
		fileTreeData = JSON.parse(storedFileTree);
    }
    if (storedCurrentLog) {
		currentLogData = JSON.parse(storedCurrentLog);
    }

}
export const fileTree = writable(fileTreeData);
export const currentLog = writable(currentLogData);

if (browser) {
	fileTree.subscribe((value) => {
		localStorage.setItem('fileTree', JSON.stringify(value));
	});
	currentLog.subscribe((value) => {
		localStorage.setItem('currentLog', JSON.stringify(value));
	});

}