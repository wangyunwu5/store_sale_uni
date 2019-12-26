<template>
	<view>
		<view class="title">顶部轮播图</view>
		<view class="picture">
			<view class="imagefile" v-for="(image,index) in imageUrl" :key="index">
				<image class="image" :data-src="image" :src="image" @tap="previewImage" mode="aspectFill" ></image>
				<view class="remove" :data-index="index"  @tap="removeImage" ></view>
			</view>
			<view class="picture-add"  @tap="chooseImage()" v-if="hasChooseImage === true"></view>
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
				imageUrl:[],
				hasChooseImage:true,
				imageFile:[],
				imageReturnFile:[],
				index:0,
			}
		},
		onLoad:function(option){
			this.goodsID=option.goodsID
			this.imageList=JSON.parse(option.imageList)
			if(this.imageList.sowingImage != ''){
				this.imageUrl=this.imageList.sowingImage.split(',');	
				if(this.imageUrl.length==6) this.hasChooseImage=false;
			}
		},
		methods:{
			navigate:function(){
				if(this.imageUrl.length==0 ){
					uni.showModal({content:'请选择图片',showCancel:false})
					return;
				}
				console.log(this.imageUrl)
				//新图片放置临时数组
				for(var i in this.imageUrl){
					if(this.imageUrl[i].indexOf("https://www.caty.top:8017") == -1)
						this.imageFile=this.imageFile.concat(this.imageUrl[i]);
				}
				//如果没有新图片
				if(this.imageFile.length==0){
					this.update();
					return ;
				}	
				uni.showLoading({title:'上传中'})
				this.uploadFile();
			},
			//上传
			uploadFile:function(){
				uni.uploadFile({
					url: "https://www.caty.top:8017/Handler.ashx",
					filePath: this.imageFile[this.index],
					name:"data",
					success: (res) => {
						var imageFile=res.data.replace("C:\\Users\\Administrator\\Desktop\\storeImage\\","https://www.caty.top:8017/").replace("\\","\/").replace("\\","\/");
						console.log("上传结束",imageFile);
						this.imageReturnFile=this.imageReturnFile.concat(imageFile);
						this.index=this.index+1;
						if(this.index==this.imageFile.length)
							this.update();
						else
							this.uploadFile();
					}
				})
			},
			update:function(){
				this.index=0
				for(var i in this.imageUrl){
					if(this.imageUrl[i].indexOf("https://www.caty.top:8017") == -1){
						this.imageUrl[i]=this.imageReturnFile[this.index]
						this.index=this.index+1
					}
				}
				console.log(this.imageUrl);
				uni.request({
					url: this.$url+'goodsAdd3',
					data: {goodsID:this.goodsID, imageUrl:this.imageUrl.join(','),step:'2'},
					success: (res) => {																	
						console.log('发布成功');		
						uni.hideLoading()
						uni.redirectTo({url:'../add5/add5?goodsID='+this.goodsID+'&imageList='+JSON.stringify(this.imageList)})		
					}							
				})	
			},
			//选择图片
			chooseImage: async function () {
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed'],
					count: 6-this.imageUrl.length,
					success: (res) => {
						this.imageUrl =this.imageUrl.concat(res.tempFilePaths);
						if(this.imageUrl.length === 6){
							this.hasChooseImage=false;
						}
					}
				})
			},
			//删除图片
			removeImage:function(e){
				var index = e.target.dataset.index;
				this.imageUrl.splice(index, 1);
				this.hasChooseImage=true;
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
