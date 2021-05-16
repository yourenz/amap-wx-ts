# 高德地图微信小程序 ts 版 sdk

## 支持功能

1. 获取 POI 数据
2. 获取输入提示词
3. 获取地址描述数据

## 使用

```javascript
const amap = AmapWx.getInstance({ key: "key" });
amap.getWxLocation(async (loc) => {
  await amap.getPoiAround({ location: loc });
  await amap.getRegeo({ location: loc });
});
amap.getInputtips({ keywords: "keywords" });
```
