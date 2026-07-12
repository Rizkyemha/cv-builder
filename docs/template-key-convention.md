# Konvensi Key Template — CV Builder

Dokumen ini untuk siapa pun yang membuat template baru (`TemplateDef`). Tujuannya: saat user pindah template, data yang **sudah diisi** tidak tertimpa/hilang oleh `defaultData` template baru.

## Kenapa ini penting

Saat `switchTemplate` dijalankan, sistem mencoba **mencocokkan** section/field lama dengan section/field template baru berdasarkan **key**, lalu meng-*carry* data user ke atasnya. Kalau key tidak konsisten antar template, sistem tidak akan tahu bahwa `"Nama Lengkap"` di Template A itu field yang sama dengan `"Nama Lengkap"` di Template B — datanya akan dianggap field baru dan ditimpa default.

**Matching selalu berdasarkan key/type, bukan label atau urutan.**

---

## Rule 1 — `Section.type` harus konsisten lintas template

Section dengan makna semantik yang sama **wajib** pakai `type` string yang identik di semua template.

```ts
// ✅ Benar — type sama walau label beda per template
// Template "modern"
{ type: "experience", label: "Work Experience", ... }

// Template "ats-friendly"
{ type: "experience", label: "Riwayat Pekerjaan", ... }
```

```ts
// ❌ Salah — type beda, dianggap section berbeda, data hilang saat pindah template
// Template "modern"
{ type: "experience", ... }

// Template "ats-friendly"
{ type: "work_history", ... }
```

> `label` boleh beda per template (untuk keperluan tampilan/bahasa), tapi `type` adalah **identitas** section dan harus sama.

**Daftar `type` section yang sudah dipakai** (gunakan ini, jangan bikin varian baru untuk konsep yang sama):

| type | Deskripsi |
|---|---|
| `profile` | Nama, kontak, ringkasan diri |
| `experience` | Pengalaman kerja |
| `education` | Riwayat pendidikan |
| `skills` | Daftar skill |
| `projects` | Proyek |
| `certifications` | Sertifikasi |

> Kalau butuh section type baru yang belum ada di daftar ini, tambahkan ke tabel di atas juga (koordinasi dulu, jangan bikin sepihak beda nama untuk konsep yang sama).

---

## Rule 2 — `key` di `FieldSettings` (section-level & block-level) harus konsisten

Sama seperti `type` pada section, setiap field (`FieldSettings.key`) untuk data yang semantiknya sama **wajib** pakai key yang identik di semua template.

```ts
// ✅ Benar
// Template "modern" → section "profile"
{ key: "fullName", label: "Nama Lengkap", type: "text", ... }

// Template "ats-friendly" → section "profile"
{ key: "fullName", label: "Full Name", type: "text", ... }
```

```ts
// ❌ Salah — key beda, data "fullName" dari template lama tidak ke-carry
// Template "modern"
{ key: "fullName", ... }

// Template "ats-friendly"
{ key: "name", ... }
```

**Daftar `key` yang sudah dipakai per section** (gunakan ini sebagai referensi, tambahkan ke sini kalau bikin field baru):

**`profile`**
| key | type | Keterangan |
|---|---|---|
| `fullName` | text | |
| `jobTitle` | text | |
| `email` | email | |
| `phone` | phone | |
| `location` | location | |
| `summary` | textarea | |

**`experience` (block-level, di dalam `blockDef.settings`)**
| key | type | Keterangan |
|---|---|---|
| `company` | text | |
| `position` | text | |
| `startDate` | date | |
| `endDate` | date | |
| `description` | textarea | |

**`education` (block-level)**
| key | type | Keterangan |
|---|---|---|
| `institution` | text | |
| `degree` | text | |
| `startDate` | date | |
| `endDate` | date | |

> Sesuaikan/lengkapi tabel ini dengan key aktual yang sudah ada di codebase kamu — di atas hanya contoh pola.

---

## Rule 3 — `type` field (`FieldType`) untuk key yang sama harus konsisten

Kalau key sama tapi `type` beda antar template (misal `startDate` di satu template `"date"`, di template lain `"text"`), data tetap ter-carry (karena matching by key), tapi **value bisa jadi tidak valid** untuk field type baru (misal string bebas dipaksa masuk ke date picker).

```ts
// ✅ Benar — key sama, type sama
{ key: "startDate", type: "date" }
{ key: "startDate", type: "date" }
```

```ts
// ❌ Hindari — key sama, type beda → value lama berpotensi tidak cocok
{ key: "startDate", type: "date" }
{ key: "startDate", type: "text" }
```

---

## Rule 4 — Jangan reuse key untuk makna berbeda

Kebalikan dari rule di atas: jangan pakai key yang sudah ada untuk field dengan makna semantik **berbeda**, walau kebetulan tipe datanya sama. Ini akan membuat data "nyasar" saat pindah template (isi field lama muncul di field yang salah).

```ts
// ❌ Salah — "location" dipakai untuk 2 makna berbeda antar template
// Template "modern" → section "profile"
{ key: "location", label: "Kota Domisili" }

// Template "creative" → section "experience" (block)
{ key: "location", label: "Lokasi Kantor" }
```

Kalau makna berbeda, beri key berbeda meski konteksnya mirip, misal `location` (domisili) vs `officeLocation` (lokasi kerja).

---

## Rule 5 — Field/section baru yang tidak ada padanan lama

Kalau template kamu punya field/section baru yang tidak ada di template lain (fitur unik template kamu), **tidak perlu** khawatir soal konsistensi key — cukup pastikan key tersebut belum dipakai untuk makna lain (lihat Rule 4). Field ini otomatis akan pakai `defaultData` saat pertama kali dipilih, karena memang belum ada data lama yang cocok.

---

## Rule 6 — `maxBlocks` lebih kecil dari template lain

Kalau `blockDef.maxBlocks` template kamu lebih kecil dari jumlah block yang mungkin sudah diisi user di template lain, block **kelebihan akan terpotong** (bukan dihapus permanen — kalau user balik ke template dengan `maxBlocks` lebih besar, block tersisa tetap ada di state, tapi block yang sempat terpotong saat di template ini **hilang permanen**, tidak bisa dikembalikan).

Kalau ingin lebih aman, pertimbangkan `maxBlocks` yang sama atau lebih besar dari template lain untuk section yang sama, atau terima trade-off ini secara sadar sebagai batasan desain template.

---

## Checklist singkat sebelum submit template baru

- [ ] Semua `Section.type` yang merepresentasikan konsep sama dengan template lain, pakai string `type` yang identik
- [ ] Semua `FieldSettings.key` (section-level & block-level) untuk data bermakna sama, identik dengan template lain
- [ ] Tidak ada key yang di-reuse untuk makna berbeda (Rule 4)
- [ ] `FieldType` untuk key yang sama konsisten antar template
- [ ] Kalau ada field/section baru, key sudah dicek belum bentrok makna dengan key yang sudah ada
- [ ] Kalau `maxBlocks` lebih kecil dari template lain, sadar akan trade-off pemotongan block
