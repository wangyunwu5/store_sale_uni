<template>
	<view>
		<view class="title">缩略图</view>
		<view class="picture">
			<view class="imagefile"  v-if="imageUrl[0] !='' ">
				<image class="image"  :data-src="imageUrl" :src="imageUrl[0]" @tap="previewImage" mode="aspectFill" ></image>
				<view class="remove" @tap="removeImage"></view>
			</view>
			<view class="picture-add"  @tap="chooseImage()" v-if="imageUrl[0]==''"></view>
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
				imageList:[],
				imageUrl:[]
			}
		},
		onLoad:function(option){
			this.goodsID=option.goodsID
			this.getInfo()
		},
		methods:{
			navigate:function(){
				if(this.imageUrl.length==0 ){
					uni.showModal({content:'请选择图片',showCancel:false})
					return;
				}
				if(this.imageUrl[0].indexOf("https://www.caty.top:8017") != -1 )
					uni.redirectTo({url:'../add4/add4?goodsID='+this.goodsID+'&imageList='+JSON.stringify(this.imageList)})
				else{
					uni.showLoading({title:'上传中'})
					uni.uploadFile({
						url: "https://www.caty.top:8017/Handler.ashx",
						filePath: this.imageUrl[0].toString(),
						name:"data",
						success: (res) => {
							var imageFile=res.data.replace("C:\\Users\\Administrator\\Desktop\\storeImage\\","https://www.caty.top:8017/").replace("\\","\/").replace("\\","\/");
							console.log("上传结束",imageFile);
							this.update(imageFile);
						}
					})
				}	
			},		
			update:function(imageFile){
				uni.request({
					url: this.$url+'goodsAdd3',
					data: {goodsID:this.goodsID, imageUrl:imageFile,step:'1'},
					success: (res) => {																	
						console.log('发布成功');		
						uni.hideLoading()
						uni.redirectTo({url:'../add4/add4?goodsID='+this.goodsID+'&imageList='+JSON.stringify(this.imageList)})		
					}							
				})	
			},
			getInfo:function(){
				uni.request({
					url: this.$url+'unSubmitGoodsDetails3',
					data: {goodsID:this.goodsID},
					success: (res) => {																		
						console.log(res)
						this.imageList=res.data.items[0]
						this.imageUrl=this.imageUrl.concat(res.data.items[0].image)
					}							
				})
			},
			//选择图片
			chooseImage: async function () {
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed'],
					count: 1-this.imageUrl.length,
					success: (res) => {
						this.imageUrl[0] =res.tempFilePaths;
						this.$forceUpdate()
					}
				})
			},
			//删除图片
			removeImage:function(){
				this.imageUrl[0]=''
				this.$forceUpdate()
			},
			//预览图片
			previewImage: function (e) {
				var current = e.target.dataset.src;
				var urls=this.imageUrl;
				uni.previewImage({
					current: current,
					urls: urls
				})
			},
		}
	}
</script>

<style>
	@import "../../../style/goods-add.css";
	@import "../../../style/uni.css";
</style>
