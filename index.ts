export interface RequestConfig {
  key: string
  s: string
  platform: string
  appname: string
  sdkversion: string
  logversion: string
}
export interface PoiAround {
  location?: string
  querytypes?: string
  querykeywords?: string
}

export interface PoiAroundRes {
  data: {
    count: number
    info: string
    infoCode: string
    status: string
    pois: {
      address: string
      adname: string
      biz_ext: {
        cost: string
        meal_ordering: string
        open_time: string
        opentime2: string
        rating: string
      }
      biz_type: string
      childtype: string
      cityname: string
      distance: string
      id: string
      importance: string
      location: string
      name: string
      parent: string
      photos: {
        title: string
        url: string
      }[]
      pname: string
      poiweight: string
      shopid: string
      shopinfo: string
      tel: string
      type: string
      typecode: string
    }[]
    suggestion: {
      cities: string
      keywords: string
    }
  }
}
export interface Inputtips {
  location?: string
  keywords: string
}

export interface InputtipsRes {
  data: {
    count: string
    info: string
    infocode: string
    status: string
    tips: {
      adcode: string
      address: string
      city: string
      district: string
      id: string
      location: string
      name: string
      typecode: string
    }[]
  }
}

export interface RegeoRes {
  data: {
    info: string
    infocode: string
    status: string
    regeocode: {
      addressComponent: {
        adcode: string
        building: {
          name: string
          type: string
        }
        businessAreas: {
          id: string
          location: string
          name: string
        }[]
        city: string
        citycode: string
        country: string
        district: string
        neighborhood: {
          name: string
          type: string
        }
        province: string
        streetNumber: {
          direction: string
          distance: string
          location: string
          number: string
          street: string
        }
        towncode: string
        township: string
      }
      aois: {
        adcode: string
        area: string
        distance: string
        id: string
        location: string
        name: string
        type: string
      }[]
      formatted_address: string
      pois: {
        address: string
        businessarea: string
        direction: string
        distance: string
        id: string
        location: string
        name: string
        poiweight: string
        tel: string
        type: string
      }[]
      roadinters: {
        direction: string
        distance: string
        first_id: string
        first_name: string
        location: string
        second_id: string
        second_name: string
      }[]
      roads: {
        direction: string
        distance: string
        id: string
        location: string
        name: string
      }[]
      status: string
    }
  }
}
class AmapWx {
  private key: string
  private requestConfig: RequestConfig
  constructor(props: { key: string }) {
    this.key = props.key
    this.requestConfig = {
      key: this.key,
      s: 'rsx',
      platform: 'WXJS',
      appname: this.key,
      sdkversion: '1.2.0',
      logversion: '2.0',
    }
  }

  private getWxLocation(cb: (location: string) => void): void {
    wx.getLocation({
      type: 'gcj02',
      success(locRes) {
        const location = locRes.longitude + ',' + locRes.latitude
        cb(location)
      },
      fail: () => {
        wx.showModal({
          title: '提示',
          content: '请点击确定进入设置页授予位置消息权限',
          success: (res) => {
            if (res.confirm) {
              wx.openSetting({
                success: () => {
                  this.getWxLocation(cb)
                },
              })
            }
          },
        })
      },
    })
  }
  /**
   * 获取周边信息
   */
  getPoiAround(props?: PoiAround): Promise<PoiAroundRes> {
    return new Promise((success, fail) => {
      const cb = (location: string) => {
        const config: RequestConfig & PoiAround = {
          location: location || '',
          querytypes: props?.querytypes || '',
          querykeywords: props?.querykeywords || '',
          ...this.requestConfig,
        }
        wx.request({
          url: 'https://restapi.amap.com/v3/place/around',
          data: config,
          method: 'GET',
          header: { 'content-type': 'application/json' },
          success,
          fail,
        })
      }
      props?.location ? cb(props.location) : this.getWxLocation(cb)
    })
  }
  /**
   * 关键词搜索
   */
  getInputtips(props?: Inputtips): Promise<InputtipsRes> {
    return new Promise((success, fail) => {
      const cb = (location: string) => {
        const config: RequestConfig & Inputtips = {
          location: location || '',
          keywords: props?.keywords || '',
          ...this.requestConfig,
        }
        wx.request({
          url: 'https://restapi.amap.com/v3/assistant/inputtips',
          data: config,
          method: 'GET',
          header: { 'content-type': 'application/json' },
          success,
          fail,
        })
      }
      props?.location ? cb(props.location) : this.getWxLocation(cb)
    })
  }
  /**
   * 地址逆编码
   */
  getRegeo(props?: { location: string }): Promise<RegeoRes> {
    return new Promise((success, fail) => {
      const cb = (location: string) => {
        const config: RequestConfig & { location: string; extensions: string } = {
          location: location || '',
          extensions: 'all',
          ...this.requestConfig,
        }
        wx.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo',
          data: config,
          method: 'GET',
          header: { 'content-type': 'application/json' },
          success,
          fail,
        })
      }
      props?.location ? cb(props.location) : this.getWxLocation(cb)
    })
  }
}

export default AmapWx
