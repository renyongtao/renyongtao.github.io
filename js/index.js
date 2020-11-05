new Vue({
	el:"#inlineOrder",
	data:{
		title:"",
		isShow:false,
		ihShowList:true,
		isShowPager:true,
		position:{},
		items:[],
		area:{
			value: [],
			options:[]
		}
	},
	created:function(){
		this.GetAreaData()
		this.CurrentSite()
	},
	methods:{
		getShop:function(){
			this.items=
				[
					{id:1,shopName:"抚琴店总店",address:"成都市金牛区抚琴西路318号附1号",phone:"028-88888888"},
					{id:2,shopName:"羊西立交店",address:"成都市金牛区抚琴西路318号附1号成都市金牛区抚琴西路318号附1号成都市金牛区抚琴西路318号附1号成都市金牛区抚琴西路318号附1号成都市金牛区抚琴西路318号附1号",phone:"028-88888888"},
					{id:3,shopName:"双流立交店",address:"成都市金牛区抚琴西路318号附1号",phone:"028-88888888"},
					{id:4,shopName:"遂宁立交店",address:"成都市金牛区抚琴西路318号附1号",phone:"028-88888888028-88888888028-88888888028-88888888028-88888888028-88888888028-88888888028-88888888"}
				]
			this.ShowList();
		},
		CurrentSite:function(){
			var _this=this;
			this.area.value=[];
			Lib.GetCurrentSite(1000,function(data){
				_this.position=data.position;
				_this.title="您所在位置"+data.addressComponent.street+data.addressComponent.township+"附近的幼幼堂门店";
				_this.getShop();
			},function(data){
				_this.title="定位失败,请按地区选择";
				_this.getShop();
			})
		}
		,
		ShowList:function(){
			if(this.items && this.items.length>0){
				this.ihShowList=true;
				this.isShow=false;
				this.isShowPager=true;
			}else{
				this.ihShowList=false;
				this.isShow=true
				this.isShowPager=false;
			}
		},
		SelectSite:function(){
			this.items=
				[
					
				]
			this.ShowList();
		},
		onClick:function(id){
			location.href="item.htm?id="+id;
		},
		AreaChange:function(data){
			var p=this.area.options.filter(function(o){
				if(o.value==data[0])
					return true;
			})
			var c=p[0].children.filter(function(city){
				if(city.value==data[1])
					return true;
			})
			var q=c[0].children.filter(function(country){
				if(country.value==data[2])
					return true;
			})
			var label=p[0].label+c[0].label+q[0].label;
			this.title="您所选择的"+label+"幼幼堂门店";
			this.SelectSite();
		},
		GetAreaData:function(){
		this.area= {
        value: [],
        options: [{
          value: '1',
          label: '四川',
          children: [{
            value: 'chengdu',
            label: '成都',
            children: [{
              value: 'shuangliuqu',
              label: '双流区'
            }, {
              value: 'piduqu',
              label: '郫都区'
            }]
          }]
        },{
          value: '2',
          label: '北京',
          children: [{
            value: 'beij',
            label: '广西壮族自自取',
            children: [{
              value: 'shuangliuqu',
              label: '双流区'
            }, {
              value: 'piduqu',
              label: '郫都区'
            }]
          }]
        }]
      };
		}
	}
});