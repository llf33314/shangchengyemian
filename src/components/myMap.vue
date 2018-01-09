 <template>
 <div class="amap-page-container">
    <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" style="position: absolute;"></el-amap-search-box>
    <div class="amap-demo vuep-scoped-52 vuep-preview">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo" :plugin="plugin" :events="events">
        <el-amap-info-window :position="mywindow.position" :content="address" :visible="mywindow.visible" :events="mywindow.events"></el-amap-info-window>
        <el-amap-marker :position="marker.position"  :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
          <!-- <el-amap-marker :key="index"  v-for="(item,index) in marker.position" :position="item"  :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker> -->
        <!-- <el-amap-circle :center="circle.center" :radius="circle.radius" :fillOpacity="circle.fillOpacity" :events="circle.events"
          :strokeColor="circle.strokeColor" :strokeStyle="circle.strokeStyle" :fillColor="circle.fillColor"></el-amap-circle> -->
      </el-amap>
      <div class="toolbar">
        <span v-if="loaded">
         经度 = {{ lng }} 纬度 = {{ lat }}
        </span>
        <span v-else>正在定位</span>
        <span>{{ address }}</span>
      </div>
    </div>
 </div>
</template>
<script>
  export default {
    props:{
        longitude:{
          type:[String, Number], 
        },
        latitude:{
          type:[String, Number], 
        },
        fulladdress:{
          type:String,
          default:'',
        },
    },
    data() {
      let self = this;
      return {
        events: {
          click(e) {
            let {lng, lat} = e.lnglat;
            self.lng = lng;
            self.lat = lat;
            var geocoder = new AMap.Geocoder({ 
              radius: 1000,
              extensions: "all"
            });
            geocoder.getAddress([lng, lat], function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  self.address = result.regeocode.formattedAddress;
                  self.$nextTick();
                  var lnglatXY = [e.lnglat.M,e.lnglat.O];
                  self.marker.position=lnglatXY;
                  self.$emit("update:longitude", lng);
                  self.$emit("update:latitude", lat);
                   self.$emit("update:address", result.regeocode.formattedAddress);
                }
              }
            });
          }
        },
        zoom: 15,
        center:[0, 0],
        loaded: true,
        lng: 0,
        lat:0,
        address: '',
        searchOption: { 
          citylimit: false
        },
        // circle: {
        //   clickable: true,
        //   center: [113.36114, 22.31889],
        //   radius: 200,
        //   fillOpacity: 0.3,
        //   strokeStyle: 'dashed',
        //   fillColor: '#FFFF00',
        //   strokeColor: '#00BFFF',
        // },  
        marker: {
          position:[0,0],
          offset: new AMap.Pixel(-5,-30),
          icon: new AMap.Icon({
            image: "http://api.amap.com/Public/images/js/mark.png",
            size:new AMap.Size(58,30),
            imageOffset: new AMap.Pixel(-32, -0)
           }),
          events: {
            click: () => {
               this.mywindow.visible = true
              if (this.mywindow.visible === true) {
                this.mywindow.visible = false
              } else {
                this.mywindow.visible = true
              }
            },
            dragend: (e) => {
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
            }
          },
          visible: true,
          draggable: false
        },
        mywindow: {
          position:[0, 0],
          content: '<h4>该点数据信息</h4><div class="text item">Information A: ...</div><div class="text item">Information B: ...</div>',
          visible: true,
          events: {
            close() {
              self.mywindow.visible = false
            }
          }
        },
        plugin: [{
          pName: 'Geolocation',
          events: {
            init(o) {
              if(self.longitude =="" || self.latitude ==""){
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                    self.lng = result.position.lng;
                    self.lat = result.position.lat;
                    self.center = [self.lng, self.lat];
                    self.address = result.formattedAddress; 
                    self.loaded = true;
                    self.$nextTick();
                  }
                });
              }
            }
          }
        }]
      };
    },
    watch: {
      
    },
    mounted() {  
      let self=this;
      if(this.longitude !="" && this.latitude !=""){
          // console.log([this.longitude, this.latitude],"323423")
          this.marker.position=[this.longitude, this.latitude];
          this.center=[this.longitude, this.latitude];
          this.mywindow.position=[this.longitude, this.latitude];
          self.getAddress(this.longitude, this.latitude);
      }
    
    },
    methods: {
      /**获取经纬度的中文地址名称 */
      getAddress(lng,lat){
         let self=this;
        var geocoder = new AMap.Geocoder({ 
          radius: 1000,
          extensions: "all"
        });
        self.lng = lng;
        self.lat = lat;
        geocoder.getAddress([lng, lat], function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.regeocode) {
              self.address = result.regeocode.formattedAddress;
              self.$nextTick();
              self.$emit("update:longitude", lng);
              self.$emit("update:latitude", lat);
              self.$emit("update:address", result.regeocode.formattedAddress);
            }
          }
        });
      },
      onSearchResult(pois) {
           let self=this;
          let latSum = 0;
          let lngSum = 0;
          if (pois.length > 0) {
            let i=0;
          pois.forEach(poi => {
            let {lng, lat} = poi;
            lngSum += lng;
            latSum += lat;
            if(i==0){
              this.marker.position=[poi.lng, poi.lat];
              self.getAddress(lng,lat);
              i++;
            }else{
              this.marker.position.push([poi.lng, poi.lat]);
            }
          });
          let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
          };
          this.center = [center.lng, center.lat];
          }
      }
    }
  }
</script>
<style>
  .el-vue-search-box-container{
    position: absolute;
  }
  .search-box,.search-box-wrapper {
    position: absolute;
    top: 14px;
    left: 18px;
  }

  .amap-page-container {
    position: relative;
  }
  .amap-demo{
      height: 500px;
  }
  </style>
 