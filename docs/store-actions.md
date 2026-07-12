# Store Actions

Semua actions ada di `store/useBuilderStore.ts`.

## Section

| Action                                | Keterangan                      |
| -------------------------------------- | -------------------------------- |
| `selectSection(idx)`                   | Pilih section + buka form        |
| `addSection(type)`                     | Tambah section berdasarkan type  |
| `deleteSection()`                      | Hapus section terpilih (min 1)   |
| `duplicateSection()`                   | Duplikat section terpilih        |
| `moveSection('up'\|'down')`            | Geser urutan                     |
| `toggleSectionVisible(idx?)`           | Toggle visibility                |
| `updateSectionData(data)`              | Update by submit + push history  |
| `updateLiveDataSection(key, data)`     | Update data by key, tanpa history (dipakai untuk live preview saat mengetik) |
| `updateHistoryDataSection(key, data)`  | Push history (dipanggil debounced setelah `updateLiveDataSection`) |

## Block

| Action                                         | Keterangan                        |
| ----------------------------------------------- | ---------------------------------- |
| `selectBlock(blockId)`                          | Pilih block + buka form            |
| `addBlock(sectionIdx?)`                         | Tambah block baru                  |
| `deleteBlock(blockId, sectionIdx?)`             | Hapus block                        |
| `duplicateBlock(blockId, sectionIdx?)`          | Duplikat block                     |
| `moveBlock(blockId, dir, sectionIdx?)`          | Geser urutan block                 |
| `updateBlockData(blockId, data, sectionIdx?)`   | Update data block + push history   |
| `updateLiveDataBlock(key, data)`                | Update data by key, tanpa history  |
| `updateHistoryDataBlock(key, data)`             | Push history (debounced)           |

## History

| Action      | Keterangan                  |
| ----------- | ---------------------------- |
| `undo()`    | Kembali ke state sebelumnya  |
| `redo()`    | Maju ke state berikutnya     |
| `canUndo()` | Boolean                      |
| `canRedo()` | Boolean                      |

Keyboard: `Ctrl+Z` undo, `Ctrl+Y` / `Ctrl+Shift+Z` redo (`hooks/useUndoRedo.ts`).

Max snapshot history: 50 entry (`MAX_HISTORY`).

## Live vs History update

Untuk field yang berubah tiap keystroke (text, textarea), gunakan pola:

```ts
function handleChange(key: string, value: string | boolean) {
  updateLiveDataSection(key, value)      // instant, preview live, TIDAK push history

  debounce(() => {
    updateHistoryDataSection(key, value) // push history setelah user berhenti mengetik
  }, 500)
}
```

Ini mencegah tiap keystroke jadi 1 history entry terpisah (undo jadi tidak berguna kalau tanpa debounce ini).
