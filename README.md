# thepiratebay.org official site's api for node.js

## work in progress..

## installation
```console
yarn add https://github.com/0x7ee/tpb-api
```

## usage

```js
const tpb = require('thepiratebay.org-api');

(async () => {
    const torrents = await tpb.search('big buck bunny');
    torrents;
    // do something with the torrents
})();
```

## api
```ts
.search(keyword: string): Promise<{
    torrentId: string;
    name: any;
    infoHash: any;
    size: number;
    seeders: number;
    leechers: number;
    subcategory: number;
    uploadDate: Date;
    imdbId: any;
    filesCount: number;
}[]>
```