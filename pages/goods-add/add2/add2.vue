<template>
	<view>
		<view class="list-input" >
			<view class="long-input2">商品规格</view>
			<view class="short-input">库存</view>
			<view class="short-input">价格</view>
		</view>
		<view class="list-input" v-for="(data,index) in listPrice" :key="index">
			<view class="long-input2">{{data.goodsSku}}</view>
			<input class="short-input" placeholder="库存"  type="digit" v-model="data.stock"  />
			<input class="short-input" placeholder="价格" v-model="data.price" />
		</view>
		<view class="list-input">
			<view class="button2 up" @tap="navigate()">下一步</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				goodsID:'',
				listPrice:[]
			}
		},
		onLoad:function(option){
			this.goodsID=option.goodsID
			this.getInfo()
		},
		methods:{
			navigate:function(){
				for(var i in this.listPrice){
					if(this.listPrice[i].stock=='' || this.listPrice[i].price=='')
					{
						uni.showModal({showCancel:false,content:'库存或价格不能为空'})
						return;
					}
				}
				var goodsPrice='';
				for(var i in this.listPrice){
					goodsPrice=goodsPrice+this.listPrice[i].goodsSku+':'+this.listPrice[i].stock+':'+this.listPrice[i].price+'-';
				}
				if(goodsPrice!='') goodsPrice=goodsPrice.substring(0,goodsPrice.length-1);
				uni.showLoading({title:''})
				uni.request({
					url: this.$url+'goodsAdd2',
					data: {goodsID:this.goodsID,goodsQuery:goodsPrice},
					success: (res) => {																		
						uni.redirectTo({url:'../add3/add3?goodsID='+this.goodsID})			
					}							
				})	
			},
			getInfo:function(){
				uni.request({
					url: this.$url+'unSubmitGoodsDetails2',
					data: {goodsID:this.goodsID},
					success: (res) => {																		
						console.log(res)
						var data=res.data.items
						for(var i in res.data.items){
							this.listPrice=this.listPrice.concat({goodsSku:data[i].goodsSku,stock:data[i].stock,price:data[i].price})
						}				
					}							
				})	
			}
		}
	}
</script>

<style>
	@import "../../../style/goods-add.css";
	@import "../../../style/uni.css";
	page{
		padding-top: 50upx;
		display: flex;
		justify-content: center;
	}
	.long-input2,.short-input{margin-right: 20upx;	}
	.short-input{text-align: center;}
</style>
