---
description: Change markdown files to mdx files
allowed-tools: Glob, Grep, LS, ExitPlanMode, Read, TodoWrite, Task, Edit, MultiEdit
---

將指定的 markdown 檔案轉換成 mdx 檔案，並確保所有的圖片路徑和導入語法都符合 mdx 的標準。

## 圖片轉換範例

```
import { Image } from 'astro:assets';
import { ImageZoom } from '@/components/ui/image-zoom.tsx';

import image from '@/assets/2025/xxx.webp';

<ImageZoom client:visible>
  <Image src={image} alt="image" />
</ImageZoom>
```
