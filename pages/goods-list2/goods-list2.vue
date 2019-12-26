<template>
	<view>
		<view class="nav">
			<image src="../../../static/buyer/up.png" v-if="order === 'up'"></image>
			<image src="../../../static/buyer/down.png" v-if="order === 'down'"></image>
			<image src="../../../static/buyer/no.png" v-if="order === 'no'"></image>
			<view :class="['nav-item',itemClass==1 ? 'active' : '']" @tap="changeItem(1)">价格</view>
			<view :class="['nav-item',itemClass==2 ? 'active' : '']" @tap="changeItem(2)">销量</view>
			<view :class="['nav-item',itemClass==3 ? 'active' : '']" @tap="changeItem(3)">上架时间</view>
		</view>
		<view class="goods" v-if="isData===true">
			<view class="goods-list">
				<block v-for="(data,index) in data" :key="index">
					<view class="goods-item" @tap="navigateToGoods(data.goodsID)">
						<image :src="data.image"  mode="aspectFill"></image>
						<view class="goods-name">{{data.goodsName}}</view>
						<view class="goods-price">￥{{data.price}}</view>
					</view>
				</block>
			</view>
			<view class="end">END</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				isData:true,
				goodsType: '',
				itemClass: 1,
				order: 'up'
			}
		},
		onLoad: function (option) {
			this.goodsType = option.goodsType;
			this.getList();
		},
		onShow:function(){
			this.getList();
		},
		onUnload:function(){
			this.data=[],
			this.isData=true,
			this.goodsType='',
			this.itemClass= 1,
			this.order= 'up'
		},
		methods: {
			getList: function () {
				uni.showToast({icon: "loading"});
				uni.request({
					url: this.$url+'goodsList2',
					data: {goodsType: this.goodsType},
					success: (res) => {
						this.data=[];
						this.data = res.data;
					},
					fail: (err) => {
						console.log(err.errMsg)
					},
					complete:(res)=>{
						uni.hideToast();
					}
				})
			}, 
			navigateToGoods:function(e){
				uni.navigateTo({
					url: '../goods-details/goods-details?goodsID='+e,
					success:function(re){
					}
				})
			},
			changeItem: function (i) {
				uni.showToast({icon: "loading"});
				this.isData=false;
				switch (i) {
					case 1:
						this.itemClass = 1;
						switch (this.order) {
							case 'no':this.order = 'up';this.priceUp();break;
							case 'up':this.order = 'down';this.priceDown();break;
							case 'down':this.order = 'up';this.priceUp();break;
						}
						break;
					case 2:this.itemClass = 2;this.order = 'no';this.salesDown();break;
					case 3:this.itemClass = 3;this.order = 'no';this.dateDown();break;
				}
			},
			//排序
			priceUp:function(){
				setTimeout(() => {
					let res=this.data;
					let list = Object.keys(res).map(index => res[index]);
					list.sort((a, b) =>  a.price - b.price);
					this.data=list;
					uni.hideToast();
					this.isData=true;
				}, 400);
			},
			priceDown:function(){
				setTimeout(() => {
					let res=this.data;
					let list = Object.keys(res).map(index => res[index]);
					list.sort((a, b) =>  b.price - a.price);
					this.data=list;
					uni.hideToast();
					this.isData=true;
				}, 400);
			},
			salesDown:function(){
				setTimeout(() => {
					let res=this.data;
					let list = Object.keys(res).map(index => res[index]);
					list.sort((a, b) =>  b.sales - a.sales);
					this.data=list;
					uni.hideToast();
					this.isData=true;
				}, 400);
			},
			dateDown:function(){
				setTimeout(() => {
					let res=this.data;
					let list = Object.keys(res).map(index => res[index]);
					list.sort((a, b) => Date.parse(b.createDate) - Date.parse(a.createDate));
					this.data=list;
					uni.hideToast();
					this.isData=true;
				}, 400);
			}
		}
	}
</script>

<style>
	@import "../../style/goods-list2.css";
</style>
