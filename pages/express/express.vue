<template>
	<view>
		<view class="list" v-for="(items,index) in array" :key="index">
			<view class="list-left">{{items.address}}</view>
			<view class="list-right"><input type="number" v-model="items.cost" /></view>
		</view>
		<view class="list pd">
			<button class="button" @tap="setCost()">修改</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array:[],
				index:0,
				free:this.$expressCost,
			};
		},
		onLoad:function(){
			this.getCost();
		},
		methods:{
			getCost:function(){
				uni.request({
					url:this.$url+'getExpressCost',
					success: (res) => {
						console.log(res)
						this.array=res.data
					}
				})
			},
			setCost:function(){
				var cost=[]
				for(var i in this.array){
					cost.push(this.array[i].cost)
				}
				uni.request({
					url:this.$url+'setExpressCost',
					data:{cost:cost.join(',')},
					success: (res) => {
						uni.showToast({title:'修改成功'})
						this.array=res.data
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		padding-top: 10%;
	}
	.list{
		width:750upx;
		height:80upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.list-left,.list-right{
		width:300upx;
		height:80upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.list-right{
		width:200upx;
		justify-content: center;
	}
	.list-right > input{
		border-bottom:1px solid #cccccc;
		text-align: center;
	}
	.pd{padding-bottom: 100upx;margin-top: 40upx;}
	.button{
		width:550upx;
		margin:0;
		border:1upx solid #333333;
	}
</style>
