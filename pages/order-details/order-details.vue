<template>
	<view>
		<view class="head">
			<label>{{status}}</label>
			<image src="../../../static/buyer/gif.png"></image>
		</view>
		<view class="user-info">
			<view>{{data.name}} {{data.tellPhone}}</view>
			<view>{{data.address}}</view>
			<label class="refunds" v-if="data.refunds==1">退款中</label>
			<label class="refunds" v-if="data.refunds==2">已退款</label>
		</view>
		<view class="goods">
			<block v-for="(data,index) in data.goodsInfo" :key="index">
				<view class="goods-info" @tap="navigateToGoods(data.goodsID)">
					<image class="image" :src="data.image"   mode="aspectFill"></image>
					<view class="parm">
						<view class="goods-name">{{data.goodsName}}</view>
						<view class="goods-parm">{{data.goodsSku}}</view>
						<view class="goods-price"><label class="price">￥{{data.price}}</label><label class="num">x{{data.goodsNumber}}</label></view>
					</view>
				</view>
			</block>
		</view>
		<view class="order-info">
			<view>备注 : {{data.remark}}</view>
			<view>订单编号 : {{data.orderID}}</view>
			<view>创建时间 : {{data.createDate}}</view>
			<view>确认收货时间 : {{data.comfirmDate}}</view>
			<view  v-if="data.refunds==2">退款金额 : {{data.refundsPrice}}</view>
			<view  v-if="data.refunds==2">退款原因 : {{data.refundsReason}}</view>
			<view  v-if="data.refunds==2">退款备注 : {{data.refundsRemark}}</view>
		</view> 
		<view class="bottom">
			<view class="cost">运费 ￥{{data.expressCost}}</view>
			<view  class="total">商品合计 ￥{{data.totalPrice}}</view>
			<label class="express" v-if="data.express!=''" @tap="express(data.express,data.expressNumber)">查看物流</label>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				data:[],
				status:''
			}
		},
		onLoad:function(option){
			this.data=JSON.parse(option.orderInfo);	
			this.orderStatus();
			console.log(this.data);
		},
		methods:{
			orderStatus:function(){
				this.status=this.data.status;
				if(this.status=='待收货'){
					var starDate = new Date();
					var endDate=this.data.comfirmDate.replace(/-/g,"/");
					var resDate = new Date(endDate).getTime() - starDate.getTime();
					var days=Math.floor(resDate/(24*3600*1000))
					var leave1=resDate%(24*3600*1000)    //计算天数后剩余的毫秒数
					var hours=Math.floor(leave1/(3600*1000))
					this.status='还剩'+days+'天'+hours+'小时自动确认'
				}
			},
			navigateToGoods:function(e){
				//console.log(JSON.stringify(e))
				uni.navigateTo({
					url: '../goods-details/goods-details?goodsID='+e,
				})
			},
			express:function(Shipper,LogisticCode){
				uni.navigateTo({
					url: '../../buyer/express/express?Shipper='+Shipper+'&LogisticCode='+LogisticCode
				})
			}
		}
	}
</script>

<style>
	@import "../../style/order-details.css";
</style>
