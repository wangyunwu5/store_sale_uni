<template>
	<view>
		<view class="nav">
			<view :class="['nav-item',itemClass==0 ? 'active' : '']" @tap="changeItem(0)">全部</view>
			<view :class="['nav-item',itemClass==1 ? 'active' : '']" @tap="changeItem(1)">待发货</view>
			<view :class="['nav-item',itemClass==2 ? 'active' : '']" @tap="changeItem(2)">待收货</view>
			<view :class="['nav-item',itemClass==3 ? 'active' : '']" @tap="changeItem(3)">已完成</view>
		</view>
		<view class="noorder" v-if="hasOrder===false">没有订单</view>
		<view class="order-list" v-if="hasOrder===true">
			<block v-for="(data,index) in data" :key="index">
				<view class="order" @tap="navigateToGoods(data)">
					<view class="order-title"><label class="date">订单编号 : {{data.orderID}}</label><label class="status">{{data.status}}</label></view>
					<view class="refunds" v-if="data.refunds==1">退款中</view>
					<view class="refunds" v-if="data.refunds==2">已退款</view>
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
						<label class="express" v-if="data.express!=''" @tap.stop="express(data.express,data.expressNumber)">查看物流</label>
						<label class="sendout" v-if="data.express==''" @tap.stop="setOut(data.orderID,data.totalPrice,data.expressCost)">发货</label>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				itemClass:0,
				status:'',
				openID:'',
				data:[],
				hasOrder:true,
				pageIndex:0
			}
		},
		onLoad:function(option){
			this.itemClass=option.s;
			switch(option.s){
				case '0':this.status="全部";break;
				case '1':this.status="待发货";break;
				case '2':this.status="待收货";break;
				case '3':this.status="已完成";break;
			}
			this.getOrderList();
		},
		onShow:function(){
			this.getOrderList();
		},
		onUnload:function(){
			this.itemClass=0;
			this.status='';
			this.openID='';
			this.data=[];
			this.hasOrder=false;
		},
		onReachBottom:function(){
			this.pageIndex=this.pageIndex+1;
			this.getOrderList();
		},
		methods:{
			changeItem:function(i){
			//	uni.showLoading({title:''})
				switch(i){
					case 0:this.itemClass=0;this.status="全部";  this.pageIndex=0;this.getOrderList();break;
					case 1:this.itemClass=1;this.status="待发货";this.pageIndex=0;this.getOrderList();break;
					case 2:this.itemClass=2;this.status="待收货";this.pageIndex=0;this.getOrderList();break;
					case 3:this.itemClass=3;this.status="已完成";this.pageIndex=0;this.getOrderList();break; 
				}
			},	
			getOrderList:function(){
				uni.showLoading({title:'加载中'})
				uni.request({
					url:this.$url+'getOrderList2',
					data:{status:this.itemClass,pageIndex:this.pageIndex},
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
					complete:(res)=>{
						uni.hideLoading()
					}
				})
			},			
			navigateToGoods:function(e){
				uni.navigateTo({
					url: '../order-details/order-details?orderInfo='+JSON.stringify(e)
				})
			},	
			express:function(Shipper,LogisticCode){
				uni.navigateTo({
					url: '../../buyer/express/express?Shipper='+Shipper+'&LogisticCode='+LogisticCode
				})
			},			
			setOut:function(orderID,totalPrice,expressCost){
				uni.navigateTo({
					url: '../set-out/set-out?orderID='+orderID+'&totalPrice='+totalPrice+'&expressCost='+expressCost
				})
			}
		}
	}
</script>

<style>
	@import "../../style/order-list.css";
</style>
