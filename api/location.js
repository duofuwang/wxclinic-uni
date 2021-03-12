/**
 * @Author: licheng
 * @Date: 2019/12/21 6:06 下午
 * @Description:
 */
import QQMapWX from "@/libs/qqmap-wx-jssdk.min.js";

export function getCity() {
  return new Promise((resolve, reject) => {
    // 获取授权信息
    uni.getSetting({
      success: res => {
        // console.log(res);
        if (res.authSetting && res.authSetting.hasOwnProperty("scope.userLocation")) {
          if (res.authSetting["scope.userLocation"]) {
            getCityInfo();
          } else {
            uni.showModal({
              title: "提示",
              content: "请重新授权获取你的地理位置，否则部分功能将无法使用",
              success: (res) => {
                if (res.confirm) {
                  uni.openSetting({
                    success: () => getCityInfo()
                  });
                } else {
                  reject("请授权获取你的地理位置，否则部分功能将无法使用！");
                }
              },
            });
          }
        } else {
          getCityInfo();
        }
      }
    });

    // 获取地理位置信息
    const getCityInfo = () => {
      // 腾讯地图Api
      const qqmapsdk = new QQMapWX({ key: "TPGBZ-Y24WR-6YFWV-WSUYA-XZBX6-ZHFJQ" });
      // 授权
      uni.authorize({
        scope: "scope.userLocation",
        success: () => {
          uni.getLocation({
            type: "gcj02", //  wgs84: 返回GPS坐标，gcj02: 返回国测局坐标
            success: res => {
              const {latitude, longitude} = res;
              const location = {latitude, longitude};
              qqmapsdk.reverseGeocoder({
                location,
                success: res => resolve(res.result)
              });
            }
          });
        },
        fail: () => reject("请授权获取你的位置，否则部分功能将无法使用！"),
      });
    };
  });
};