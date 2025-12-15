import { downloadJsonFile, readFileContent } from "./file";

interface ReadingListItem {
  title: string;
  url: string;
  hasBeenRead: boolean;
  creationTime: number;
}

export const exportReadingList = async (): Promise<string> => {
  try {
    const readingList = await chrome.readingList.query({});
    downloadJsonFile(readingList, "reading-list.json");
    return "Export successful!";
  } catch (error) {
    console.error("Error exporting reading list:", error);
    return "Error exporting reading list.";
  }
};

export const importReadingList = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    const content = await readFileContent(file);
    const items: ReadingListItem[] = JSON.parse(content);
    if (!Array.isArray(items)) {
      return "Invalid file format. Expected an array of reading list items.";
    }

    const sortedItems = items.sort((a, b) => a.creationTime - b.creationTime);

    let importedCount = 0;
    for (const item of sortedItems) {
      if (item.url && item.title) {
        await chrome.readingList.addEntry({
          url: item.url,
          title: item.title,
          hasBeenRead: item.hasBeenRead || false,
        });
        importedCount++;

        if (onProgress) {
          onProgress((importedCount / sortedItems.length) * 100);
        }
        await new Promise((resolve) => setTimeout(resolve, 1));
      }
    }

    return `Imported ${importedCount} items successfully.`;
  } catch (error) {
    console.error("Error importing reading list:", error);
    return "Error importing reading list. Make sure the file is a valid JSON export.";
  }
};

export const deleteAllEntries = async (): Promise<string> => {
  try {
    const items = await chrome.readingList.query({});
    for (const item of items) {
      await chrome.readingList.removeEntry({ url: item.url });
    }
    return "All reading list entries deleted successfully.";
  } catch (error) {
    console.error("Error deleting all entries:", error);
    return "Error deleting all entries.";
  }
};
