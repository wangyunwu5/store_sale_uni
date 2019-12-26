<template>
	<view>
		<view class="list">
			<view class="list-input">
				<input class="input" placeholder="商品名" v-model="inputName" />
			</view>
			<view class="list-input">
				<input class="input" placeholder="类别" v-model="inputType"  />
			</view>
			<view class="title">参数</view>
			<block v-for="(item,index) in listParm" :key="index">
				<view class="list-input">
					<input class="short-input" placeholder="例:材料" v-model="item.parm" />:
					<input class="long-input" placeholder="例:涤纶"   v-model="item.parmValue" />				
				</view>
			</block>
			<view class="list-input">
				<view class="button1" @tap="addInput">添加</view>
				<view class="button1" @tap="delInput">删除</view>
			</view>
			<view class="title">规格</view>
			<view class="list-input">
				<input class="short-input" placeholder="例:颜色" v-model="inputSpec1"  />:
				<input class="long-input" placeholder="黑色,金色,白色" v-model="inputSpecValue1"  />
			</view>
			<view class="list-input">
				<input class="short-input" v-model="inputSpec2"  />:
				<input class="long-input"  v-model="inputSpecValue2"/>
			</view>
			<view class="list-input">
				<input class="short-input" v-model="inputSpec3"  />:
				<input class="long-input" v-model="inputSpecValue3 "/>
			</view>
			<view class="list-input">
				<input class="short-input" v-model="inputSpec4"  />:
				<input class="long-input"  v-model="inputSpecValue4 "/>
			</view>
			<view class="list-input">
				<view class="button2" @tap="changeInput">转化</view>
			</view>
			<block v-for="(item,index) in listPrice" :key="index">
				<view class="list-input">
					<view class="long-input2" v-model="item.goodsAllSpec" >{{item.goodsAllSpec}}</view>
					<input class="short-input" placeholder="库存" v-model="item.number" type="digit" />
					<input class="short-input" placeholder="价格" v-model="item.price"  />
				</view>
			</block>
			<view class="title">缩略图</view>
			<view class="picture">
				<block v-for="(image,index) in imageList1" :key="index">
					<view class="imagefile">
						<image class="image" :src="image" :data-src="image" :data-list="1" @tap="previewImage" mode="aspectFill" ></image>
						<view class="remove" :data-index="index" :data-list="1" @tap="removeImage"></view>
					</view>
				</block>
				<block v-if="hasChooseImage1 === true">
					<view class="picture-add"  @tap="chooseImage(1)"></view>
				</block>
			</view>
			<view class="title">顶部轮播图</view>
			<view class="picture">
				<block v-for="(image,index) in imageList2" :key="index">
					<view class="imagefile">
						<image class="image"  :src="image" :data-src="image" :data-list="2" @tap="previewImage" mode="aspectFill"></image>
						<view class="remove" :data-index="index" :data-list="2" @tap="removeImage"></view>
					</view>
				</block>
				<block v-if="hasChooseImage2 === true">
					<view class="picture-add"  @tap="chooseImage(5)"></view>
				</block>
			</view>
			<view class="title">详情</view>
			<view class="picture">
				<block v-for="(image,index) in imageList3" :key="index">
					<view class="imagefile">
						<image class="image" :src="image" :data-src="image" :data-list="3" @tap="previewImage" mode="aspectFill"></image>
						<view class="remove" :data-index="index" :data-list="3" @tap="removeImage"></view>
					</view>
				</block>
				<block v-if="hasChooseImage3 === true">
					<view class="picture-add"  @tap="chooseImage(50)"></view>
				</block>
			</view>
			<view class="list-input">
				<view class="button2 up" @tap="uploadImage1()">修改</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				goodsID:'',
				goodsInfo:'',
				goodsSpec:'',
				goodsPrice:'',
				listParm:[],
				listPrice:[],
				imageList1: [],
				imageList2: [],
				imageList3: [],
				hasChooseImage1: true,
				hasChooseImage2: true,
				hasChooseImage3: true,
				imageFile1:'',
				imageFile2:'',
				imageFile3:'',
				imageIndex:0,
				inputName:'',
				inputType:'',
				inputParm:'',
				inputParmValue:'',
				inputSpec1:'',
				inputSpec2:'',
				inputSpec3:'',
				inputSpec4:'',
				inputSpecValue1:'',
				inputSpecValue2:'',
				inputSpecValue3:'',
				inputSpecValue4:''
			}
		},
		onUnload:function(){
			this.listParm=[],
			this.listPrice=[],
			this.imageList1= [],
			this.imageList2= [],
			this.imageList3= [],
			this.hasChooseImage1= true,
			this.hasChooseImage2= true,
			this.hasChooseImage3= true,
			this.imageFile1='',
			this.imageFile2='',
			this.imageFile3='',
			this.imageIndex=0,
			this.inputName='',
			this.inputType='',
			this.inputParm='',
			this.inputParmValue='',
			this.inputSpec1='',
			this.inputSpec2='',
			this.inputSpec3='',
			this.inputSpec4='',
			this.inputSpecValue1='',
			this.inputSpecValue2='',
			this.inputSpecValue3='',
			this.inputSpecValue4='',
			this.isChange=false
		},
		onLoad:function(option){
			this.goodsID = option.goodsID;
			this.getInfo();
		},
		methods:{
			//添加
			goodsAdd:function(){
				var goodsParm='';
				for(var i in this.listParm){
					if(this.listParm[i].parm=='' || this.listParm[i].parmValue=='') continue;
					goodsParm=goodsParm+this.listParm[i].parm+':'+this.listParm[i].parmValue+',';
				}
				var goodsSpec='';
				var listSpec=[this.inputSpec1,this.inputSpec2,this.inputSpec3,this.inputSpec4];
				var listSpec2=[this.inputSpecValue1,this.inputSpecValue2,this.inputSpecValue3,this.inputSpecValue4];
				for(var i in listSpec){
					if(listSpec[i]!='' && listSpec2[i] != '')
						goodsSpec=goodsSpec+listSpec[i]+':'+listSpec2[i]+'-'
				}
				var goodsPrice='';
				for(var i in this.listPrice){
					if(this.listPrice[i].goodsAllSpec=='' || this.listPrice[i].price=='' || this.listPrice[i].number=='') continue;
					goodsPrice=goodsPrice+this.listPrice[i].goodsAllSpec+':'+this.listPrice[i].number+':'+this.listPrice[i].price+'-';
				}
				if(goodsParm!='') goodsParm=goodsParm.substring(0,goodsParm.length-1);
				if(goodsSpec!='') goodsSpec=goodsSpec.substring(0,goodsSpec.length-1);
				if(goodsPrice!='') goodsPrice=goodsPrice.substring(0,goodsPrice.length-1);
				var post={
					goodsID:this.goodsInfo.goodsID,
					goodsName:this.inputName,
					goodsType:this.inputType,
					goodsParm:goodsParm,
					goodsSpec:goodsSpec,
					goodsPrice:goodsPrice,
					image:this.imageFile1,
					sowingImage:this.imageFile2,
					detailsImage:this.imageFile3
				}
				console.log(JSON.stringify(post));
				uni.request({
					url: this.$url+'goodsUpdate',
					data: {goodsQuery: JSON.stringify(post) },
					success: (res) => {																	
						console.log('修改成功');			
						var pages = getCurrentPages();
						if (pages.length > 1) {
							var prePage = pages[pages.length - 3];
							prePage.onLoad();  
						}
						uni.showModal({content: "修改成功",showCancel: false,});
						setTimeout(() =>{uni.hideToast();uni.navigateBack( {delta: 2});}, 500);
					},
					fail: (err) => {
						console.log('fail', err);
						uni.hideToast();
					}								
				})	
			},
			//上传图片
			uploadImage1:function(){
				if(this.imageList1[this.imageIndex].indexOf("https://www.caty.top:8080/") != -1){
					this.imageFile1=this.imageList1[0];
					this.uploadImage2();
				}
				else{
					uni.uploadFile({
						url: "https://www.caty.top:8080/Handler.ashx",
						filePath: this.imageList1[0],
						name:"data",
						success: (res) => {
							this.imageFile1=res.data.replace("C:\\Users\\Administrator\\Desktop\\images\\","https://www.caty.top:8080/").replace("\\","\/").replace("\\","\/");
							console.log("上传结束",this.imageFile1);
							this.uploadImage2();
						},
						fail:(err)=>{
							uni.showModal({content:err.errMsg})
						}
					})
				}
			},
			uploadImage2:function(){
				if(this.imageIndex===this.imageList2.length){
					this.imageIndex=0;
					this.imageFile2=this.imageFile2.substring(0,this.imageFile2.length-1);
					console.log("上传结束",this.imageFile2);
					this.uploadImage3();
				}
				else{
					if(this.imageList2[this.imageIndex].indexOf("https://www.caty.top:8080/") != -1){
						this.imageFile2=this.imageFile2+this.imageList2[this.imageIndex]+',';
						this.imageIndex++;
						this.uploadImage2();
					}
					else{
						uni.uploadFile({
							url: "https://www.caty.top:8080/Handler.ashx",
							filePath: this.imageList2[this.imageIndex],
							name:"data",
							success: (res) => {
								var imagefile=res.data.replace("C:\\Users\\Administrator\\Desktop\\images\\","https://www.caty.top:8080/").replace("\\","\/").replace("\\","\/");
								this.imageIndex++;
								this.imageFile2=this.imageFile2+imagefile+','							
								this.uploadImage2();
							},
							fail:(err)=>{
								uni.showModal({content:err.errMsg,})
							}
						})
					}
				}
			},
			uploadImage3:function(){	
				if(this.imageIndex===this.imageList3.length){
					this.imageIndex=0;
					this.imageFile3=this.imageFile3.substring(0,this.imageFile3.length-1);
					console.log("上传结束",this.imageFile3);
					this.goodsAdd();
				}
				else{
					if(this.imageList3[this.imageIndex].indexOf("https://www.caty.top:8080/") != -1){
						this.imageFile3=this.imageFile3+this.imageList3[this.imageIndex]+',';
						this.imageIndex++;
						this.uploadImage3();
					}
					else{
						uni.uploadFile({
							url: "https://www.caty.top:8080/Handler.ashx",
							filePath: this.imageList3[this.imageIndex],
							name:"data",
							success: (res) => {
								var imagefile=res.data.replace("C:\\Users\\Administrator\\Desktop\\images\\","https://www.caty.top:8080/").replace("\\","\/").replace("\\","\/");
								this.imageIndex++;
								this.imageFile3=this.imageFile3+imagefile+','
								this.uploadImage3();
							},
							fail:(err)=>{
								uni.showModal({content:err.errMsg,})
							}
						})
					}
				}
			},
			//转化input
			changeInput:function(){
				this.listPrice=[];
				var spec1=this.inputSpecValue1.replace(/，/g,',').split(',');
				var spec2=this.inputSpecValue2.replace(/，/g,',').split(',');
				var spec3=this.inputSpecValue3.replace(/，/g,',').split(',');
				var spec4=this.inputSpecValue4.replace(/，/g,',').split(',');	
				for(var i=0;i<spec1.length;i++)
				{
					for(var j=0;j<spec2.length;j++)
					{
						for(var k=0;k<spec3.length;k++)
						{
							for(var l=0;l<spec4.length;l++)
							{
								var goodsAllSpec='';
								if(spec1[i] != '')
									goodsAllSpec=spec1[i];
								if(spec2[j] != '')
									goodsAllSpec=goodsAllSpec+ ',' +spec2[j];
								if(spec3[k] != '')
									goodsAllSpec=goodsAllSpec+ ',' +spec3[k];
								if(spec4[l] != '')
									goodsAllSpec=goodsAllSpec+ ',' +spec4[l];
								this.listPrice=this.listPrice.concat({goodsAllSpec:goodsAllSpec,number:'',price:''});
							}
						}
					}					
				}
			},
			//取数据
			getInfo:function(){
				uni.showToast({icon: "loading"});
				uni.request({
					url:this.$url+'goodsDetails',
					data:{goodsID:this.goodsID},
					success:(res)=>{					
						res.data.goodsInfo.SowingImage=res.data.goodsInfo.SowingImage.split(',');
						res.data.goodsInfo.DetailsImage=res.data.goodsInfo.DetailsImage.split(',');						
						this.goodsInfo=res.data.goodsInfo;
						this.goodsSpec=res.data.goodsSpec;
						this.goodsPrice=res.data.goodsPrice; 
						this.setInfo();
						uni.hideToast();
					}
				})
			},		
			//绑定数据
			setInfo:function(){
				this.inputName=this.goodsInfo.goodsName;
				this.inputType=this.goodsInfo.goodsType;
				//参数
				for(var i in this.goodsInfo.goodsParm){
					this.listParm=this.listParm.concat({parm:this.goodsInfo.goodsParm[i].parm,parmValue:this.goodsInfo.goodsParm[i].value});
				}
				//规格
				if(this.goodsSpec[0]){
					this.inputSpec1=this.goodsSpec[0].goodsSpec;
					for(var i in this.goodsSpec[0].goodsSpecValue){
						this.inputSpecValue1=this.inputSpecValue1+this.goodsSpec[0].goodsSpecValue[i].value+',';
					}
					this.inputSpecValue1=this.inputSpecValue1.substring(0,this.inputSpecValue1.length-1);
				}
				if(this.goodsSpec[1]){
					this.inputSpec2=this.goodsSpec[1].goodsSpec;
					for(var i in this.goodsSpec[1].goodsSpecValue){
						this.inputSpecValue2=this.inputSpecValue2+this.goodsSpec[1].goodsSpecValue[i].value+',';
					}
					this.inputSpecValue2=this.inputSpecValue2.substring(0,this.inputSpecValue2.length-1);
				}
				if(this.goodsSpec[2]){
					this.inputSpec3=this.goodsSpec[2].goodsSpec;
					for(var i in this.goodsSpec[2].goodsSpecValue){
						this.inputSpecValue3=this.inputSpecValue3+this.goodsSpec[2].goodsSpecValue[i].value+',';
					}
					this.inputSpecValue3=this.inputSpecValue3.substring(0,this.inputSpecValue3.length-1);
				}
				if(this.goodsSpec[3]){
					this.inputSpec4=this.goodsSpec[3].goodsSpec;
					for(var i in this.goodsSpec[3].goodsSpecValue){
						this.inputSpecValue4=this.inputSpecValue4+this.goodsSpec[3].goodsSpecValue[i].value+',';
					}
					this.inputSpecValue4=this.inputSpecValue4.substring(3,this.inputSpecValue4.length-1);
				}
				//价格
				for(var i in this.goodsPrice){
					this.listPrice=this.listPrice.concat({goodsAllSpec:this.goodsPrice[i].goodsAllSpec,number:this.goodsPrice[i].number,price:this.goodsPrice[i].price});
				}
				//图片
				this.imageList1=this.imageList1.concat(this.goodsInfo.image);
				for(var i in this.goodsInfo.SowingImage){
					this.imageList2=this.imageList2.concat(this.goodsInfo.SowingImage[i]);
				}
				for(var i in this.goodsInfo.DetailsImage){
					this.imageList3=this.imageList3.concat(this.goodsInfo.DetailsImage[i]);
				}
				this.hasChooseImage1=false;
				if(this.imageList2.length==5) this.hasChooseImage2=false;
				if(this.imageList3.length==50) this.hasChooseImage3=false;
			},
			//选择图片
			chooseImage: async function (count) {
				var overplus=0;
				switch(count){
					case 1:overplus=count-this.imageList1.length;break;
					case 5:overplus=count-this.imageList2.length;break;
					case 50:overplus=count-this.imageList3.length;break;
				}
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed'],
					count: overplus,
					success: (res) => {
						if(count==1){
							this.imageList1 = this.imageList1.concat(res.tempFilePaths);
							this.hasChooseImage1=false;
						}
						else if(count==5){
							this.imageList2 = this.imageList2.concat(res.tempFilePaths);
							if(this.imageList2.length === 5){
								this.hasChooseImage2=false;
							}
						}
						else{
							this.imageList3 = this.imageList3.concat(res.tempFilePaths);
							if(this.imageList3.length === 50){
								this.hasChooseImage3=false;
							}
						}
					}
				})
			},
			//预览图片
			previewImage: function (e) {
				var current = e.target.dataset.src;
				var list = e.target.dataset.list;
				var urls=[];
				switch(list){
					case 1:urls=this.imageList1;break;
					case 2:urls=this.imageList2;break;
					case 3:urls=this.imageList3;break;
				}
				uni.previewImage({
					current: current,
					urls: urls
				})
			},
			//删除图片
			removeImage: function(e){
				var index = e.target.dataset.index;
				var list = e.target.dataset.list;			 
				switch(list){
					case 1:this.imageList1.splice(index, 1);this.hasChooseImage1=true;break;
					case 2:this.imageList2.splice(index, 1);this.hasChooseImage2=true;break;
					case 3:this.imageList3.splice(index, 1);this.hasChooseImage3=true;break;
				}
			},
			//添加input
			addInput:function(){
				this.listParm=this.listParm.concat({parm:'',parmValue:''});
			},
			//删除input
			delInput:function(){
				this.listParm.splice(-1,1);
			}
		}
	}
</script>

<style>
	@import "../../style/goods-add.css";
	@import "../../style/uni.css";
</style>
