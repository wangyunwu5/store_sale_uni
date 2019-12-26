<template>
	<view>
		<view class="content">
			<view>
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="picker">快递: {{array[index]}}</view>
				</picker>
			</view>
			<view class="txt">
				<input type="text" v-model="LogisticCode" />
				<image src="../../../static/seller/saoyisao.png" mode="widthFix" @tap="scanCode"></image>
			</view>
			<button class="button" @tap="setOut">提交</button>
			<button class="button no" @tap="setOutNo">无需物流</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				orderID:'',
				totalPrice:0,
				expressCost:0,
				index: 0,	
				array: ['顺丰速运','百世快递','中通快递','申通快递','圆通快递','韵达快递','邮政快递','EMS','天天快递','京东快递','优速快递','德邦快递','宅急送'],
				LogisticCode:'',
				itemClass:0
			}
		},
		onLoad:function(option){
			this.itemClass=option.s;
			this.orderID=option.orderID
			this.totalPrice=option.totalPrice
			this.expressCost=option.expressCost
		},
		onUnload:function(){
			this.orderID='';
			this.index=0;
			this.LogisticCode=''
		},
		methods:{
			bindPickerChange: function (e) {
				this.index = e.target.value
				console.log(e)
			},
			scanCode: function () {
				uni.scanCode({
					success:  (res)=>{
						this.LogisticCode = res.result
					},
					fail: function (res) {}
				})
			},
			setOut:function(){
				if(this.LogisticCode==''){
					uni.showModal({
						title: "",
						content: "物流单号不能为空",
						showCancel: false,
						confirmText: "确定"
					})
					return;
				}
				uni.request({
					url:this.$url+'sendOut',
					data:{orderID:this.orderID,Shipper:this.array[this.index],LogisticCode:this.LogisticCode},
					success:(res)=>{
						uni.showToast({title: "提交成功"}),
						setTimeout(()=>{uni.navigateBack()},1000)
					}
				})
			},
			setOutNo:function(){
				uni.request({
					url:this.$url+'sendOut',
					data:{orderID:this.orderID,Shipper:'无需物流',LogisticCode:''},
					success:(res)=>{
						uni.showToast({title: "提交成功"})
						if(this.expressCost != 0){
							this.refund()
						}
						setTimeout(()=>{uni.navigateBack()},1000)
					}
				})
			},
			//退款
			refund:function(){
				uni.request({
					url:'https://www.caty.top/api/Payment/refundment',
					data:{appid:this.$appid,orderid:this.orderID,total_fee:parseFloat(this.totalPrice)*100,refund_fee:parseFloat(this.expressCost)*100,remark:'运费退款'},
					success:(res)=>{
						console.log(res)
					}
				})
			}
		},
	}
</script>

<style>
	page{
		background-color: white;
	}
	.content{
		padding-top:20%;
		height:300upx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.content>view{
		width:750upx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	picker{
		width:600upx;
		height:80upx;
	}
	.picker{
		width:750upx;
	}
	.txt{
		border:1upx solid #CCCCCC;
		border-radius: 10upx;
		width:596upx !important;;
		height:78upx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.txt > input{
		width:536upx;
		height:60upx !important;;
	}
	.txt > image{
		position: absolute;
		right:10upx;
		top:8upx;
		width:60upx;
		height:60upx;
		z-index: 20;
	}
	.button{
		height:80upx;
		width:600upx;
		line-height: 80upx;
		font-size:30upx;
		background-color: #B59F78;
		color:white;
	}
	.no{
		background-color: white;
		border:1upx solid #B59F78;
		color:#B59F78;
		margin-top:0;
	}
</style>
