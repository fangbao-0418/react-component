# usage
```
npm config set registry http://npmregistry.i-counting.cn
yarn add pilipa || npm install pilipa
or
yarn add pilipa --registry http://npmregistry.i-counting.cn
```

# Development
```
npm config set registry http://npmregistry.i-counting.cn
yarn install
npm run dev
...
npm run lib
npm run dist
```

# dependency 
### commonjs
- `yarn add @types/ali-oss --registry http://npmregistry.i-counting.cn`
- `yarn add viewerjs@^1.0.0`
- `yarn add react@^16.2.0 react-dom@^16.2.0`
- `yarn add font-awesome@^4.7.0`
- `yarn add jquery@^3.2.1`

### amd
```
define(['jquery', 'react', 'react-dom', 'viewerjs', 'ali-oss'], ($, React, ReactDom, Viewer, OSS) => {})
```

# Change Log 
### 1.1.1  
  &nbsp;&nbsp; `2018-4-8`
  - dropdown 支持键盘上下按键选择，回车确认选择 #20
### 1.1.2  
  &nbsp;&nbsp; `2018-4-9`
  - webuploader 添加callback #15
