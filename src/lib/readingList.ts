import { downloadJsonFile, readFileContent } from './file';

export const exportReadingList = async (): Promise<string> => {
  try {
    const readingList = await chrome.readingList.query({});
    downloadJsonFile(readingList, 'reading-list.json');
    return 'Export successful!';
  } catch (error) {
    console.error('Error exporting reading list:', error);
    return 'Error exporting reading list.';
  }
};

export const importReadingList = async (file: File): Promise<string> => {
  try {
    const content = await readFileContent(file);
    const items = JSON.parse(content);
    if (!Array.isArray(items)) {
      return 'Invalid file format. Expected an array of reading list items.';
    }

    let importedCount = 0;
    for (const item of items) {
      if (item.url && item.title) {
        await chrome.readingList.addEntry({
          url: item.url,
          title: item.title,
          hasBeenRead: item.hasBeenRead || false,
        });
        importedCount++;
      }
    }
    return `Imported ${importedCount} items successfully.`;
  } catch (error) {
    console.error('Error importing reading list:', error);
    return 'Error importing reading list. Make sure the file is a valid JSON export.';
  }
};
