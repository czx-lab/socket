#### protobuf-cli
```
npm i -g protobufjs-cli

pbjs -t static-module -w commonjs -o gateway.js gateway.proto

pbts -o gateway.d.ts gateway.js
```