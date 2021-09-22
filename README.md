# 高德地图微信小程序 ts 版 sdk

## 支持功能

1. 获取 POI 数据
2. 获取输入提示词
3. 获取地址描述数据
4. 获取天气

## 使用

```javascript
const amap = AmapWx.getInstance({ key: "key" });

amap.getWxLocation(async (loc) => {
  
  // 获取 POI 数据
  const PoiAroundRes = await amap.getPoiAround({ location: loc });

  // 获取地址描述数据
  const regeoRes = await amap.getRegeo({ location: loc });

  // 获取天气
  const weatherRes = await Amap.getWeather({
    city: regeoRes.data.regeocode.addressComponent.adcode,
  });
  const cityWeather = weatherRes.data.lives[0];

});

// 获取输入提示词
const InputtipsRes = amap.getInputtips({ keywords: "keywords" });
```
