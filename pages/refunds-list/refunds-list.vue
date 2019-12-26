<template>
	<view>
		<view class="order-list" style="padding:0">
			<block v-for="(data,index) in data" :key="index">
				<view class="order" @tap="navigateToGoods(data)">
					<view class="order-title"><label class="date">订单编号 : {{data.orderID}}</label><label class="status">{{data.status}}</label></view>
					<view class="refunds" v-if="data.refunds==1">退款中</view>
					<block v-for="(d,inx) in data.goodsInfo" :key="inx">
						<view class="order-goods" >
							<image class="image" :src="d.image" mode="aspectFill"></image>
							<view class="goods-info">
								<view class="goods-name">{{d.goodsName}}</view>
								<view class="goods-parm">{{d.goodsSku}}</view>
								<view class="goods-price"><label>￥{{d.price}}</label><label class="date">x{{d.goodsNumber}}</label></view>
							</view>
						</view>
					</block>
					<view class="order-title">
						<label>合计<label class="price">￥{{data.totalPrice}}</label></label>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[],
				pageIndex:0
			};
		},
		onLoad:function(){
			
		},
		onShow:function(){
			this.getOrderList();
		},
		onReachBottom:function(){
			this.pageIndex=this.pageIndex+1;
			this.getOrderList();
		},
		methods:{
			getOrderList:function(){
				uni.showLoading({title:'加载中'})
				uni.request({
					url:this.$url+'getRefundsList',
					data:{pageIndex:this.pageIndex},
					success:(res)=>{
						console.log(res)
						for(var i in res.data){
							res.data[i].totalPrice=parseFloat(res.data[i].totalPrice)+parseFloat(res.data[i].expressCost)
						}
						if(this.pageIndex==0)
							this.data=res.data;
						else
							this.data=this.data.concat(res.data);
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			navigateToGoods:function(data){
				uni.navigateTo({
					url: '../refunds-details/refunds-details?orderInfo='+JSON.stringify(data)
				})
			},
		}
	}
</script>

<style>
	@import "../../style/order-list.css";
</style>
