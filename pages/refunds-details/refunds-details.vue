<template>
	<view>
		<view class="user-info">
			<view>{{data.name}} {{data.tellPhone}}</view>
			<view>{{data.address}}</view>
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
			<view>运费 : {{data.expressCost}}</view>
			<view>商品合计 : {{data.totalPrice}}</view>
			<view>退款金额 : {{data.refundsPrice}}</view>
			<view>退款原因 : {{data.refundsReason}}</view>
			<view>退款备注 : {{data.refundsRemark}}</view>
		</view> 
		<view class="btnCancel"   @tap="btnCancel()">拒绝</view>
		<view class="btnConfirm"  @tap="btnConfirm()">同意</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[],
			};
		},
		onLoad:function(option){
			this.data=JSON.parse(option.orderInfo);	
			//console.log(this.data);
		},
		methods:{
			btnCancel:function(s){
				uni.showModal({
					content: "是否拒绝？",confirmText: "确定",cancelText: "取消",
					success:(res)=>{
						if(res.confirm){
							this.opRefunds(0)
						}
					}
				})
			},
			btnConfirm:function(s){
				uni.showModal({
					content: "是否同意？",confirmText: "确定",cancelText: "取消",
					success:(res)=>{
						if(res.confirm){
							this.refund()
						}
					}
				})
			},
			opRefunds:function(status){
				uni.request({
					url:this.$url+'refundsOpreate',
					data:{orderID:this.data.orderID,refundsPrice:'',refundsReason:'',refundsRemark:'',user:'seller',status:status},
					success:(res)=>{
						if(res.data=="true"){
							uni.showToast({title:'操作成功'})
							setTimeout(()=>{uni.navigateBack({})},1000)
						}
					}
				})
			},
			//退款
			refund:function(){
				uni.request({
					url:'https://www.caty.top/api/Payment/refundment',
					data:{appid:this.$appid,orderid:this.data.orderID,total_fee:(parseFloat(this.data.totalPrice)*100).toFixed(0),refund_fee:(parseFloat(this.data.refundsPrice)*100).toFixed(0),remark:'用户申请退款'},
					success:(res)=>{
						console.log(res)
						if(res.data=="true"){
							this.opRefunds(1)
						}
						else{
							uni.showModal({
								showCancel:false,
								title:'',
								content:'退款失败'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import "../../style/refunds-details.css";
</style>
