<template>
	<view>
		<view class="nav">
			<view :class="['nav-item',items.active==true ? 'nav-item-active' : '']" v-for="(items,index) in dataType" :key="index" @tap="goodsTypeTap(index)">{{items.name}}</view>
		</view>
		<view class="content">
			<view class="content-title" @tap="goodsTypeDetails()">
				<label>{{title}}</label>
				<view class="details"><label>分类详情</label><image src="../../../static/buyer/right2.png"></image></view>
			</view>
			<view class="content-item" v-for="(items,index) in dataGoods" :key="index" @tap="goodsDetails(items.goodsID)">
				<image class="img" :src="items.image" mode="aspectFill"></image>
				<view class="goods-name">{{items.goodsName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[],
				dataType:[{name:'全部',active:true}],
				dataGoods:[],
				title:'全部'
			};
		},
		onLoad:function(){
			this.getList()
		},
		methods:{
			getList:function(){
				uni.request({
					url: this.$url+'goodsClassify',
					data: {},
					success: (res) => {
						this.data = res.data;
						for(var i in this.data){
							this.dataType.push({name:this.data[i].goodsType,active:false})
							this.dataGoods.push(this.data[i])
						}
						//去重
						for(var i = 0; i < this.dataType.length-1; i++){
							for(var j = i+1; j < this.dataType.length; j++){
								if(this.dataType[i].name==this.dataType[j].name){				 
									this.dataType.splice(j,1);
									j--;
								}
							}
						}
					}		
				})
			},
			goodsTypeTap:function(index){
				for(var i in this.dataType){
					this.dataType[i].active=false;
				}
				this.dataGoods=[]
				this.dataType[index].active=true;
				this.title=this.dataType[index].name
				if(this.title=='全部')
					this.dataGoods=this.data
				else{
					for(var i in this.data){
						if(this.data[i].goodsType==this.title){
							this.dataGoods.push(this.data[i])
						}
					}
				}
			},
			goodsDetails:function(goodsID){
				uni.navigateTo({url: '../goods-details/goods-details?goodsID='+goodsID})
			},
			goodsTypeDetails:function(){
				var goodsType=this.title
				goodsType=(goodsType=='全部'?'all':goodsType)
				uni.navigateTo({url: '../goods-list/goods-list?goodsType='+goodsType})
			}
		}
	}
</script>

<style>
	@import "../../style/goods-list.css";
</style>
