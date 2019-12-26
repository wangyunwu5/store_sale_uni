<template>
	<view>
		<view class="top">
			<swiper  autoplay="true" indicator-dots="true" circular="true" class="top-img">
				<swiper-item v-for="(img,index) in goodsInfo.sowingImage" :key="index" >
					<image :src="img" class="top-img" mode="aspectFill" :data-src="image"   @tap.stop="previewImage" />
				</swiper-item>
			</swiper>
		</view>
		<view class="price">
			<view class="goods-name">{{goodsInfo.goodsName}}</view>
			<view class="goods-price">{{goodsInfo.priceRange}}</view>
		</view>
		<view class="goods-details" v-if="hasGoodsParm===true">
			<view class="uni-list-cell uni-collapse">
				<view class="uni-list-cell-navigate">商品参数</view>
				<block v-for="(items,index) in goodsInfo.goodsParm" :key="index">
					<view class="parm">
						<label>{{items.parm}}</label>
						<label>{{items.value}}</label>
					</view>
				</block>
			</view>
		</view>
		<view class="goods-details pd">
			<view class="uni-list-cell uni-collapse">
				<view class="uni-list-cell-navigate">商品详情</view>				
			</view>
			<block v-for="(img,index) in goodsInfo.detailsImage" :key="index">
				<image class="details-image" :src="img" mode="widthFix" ></image>
			</block>
		</view>
		<view class="bottom">
			<view class="chakan" @tap="showSheet">查看</view>
			<view class="bianji" @tap="navigateTo">编辑</view>
			<view class="shanchu" @tap="degoods">删除</view>
		</view>
		<!--弹出菜单-->
		<view class="sheet" v-if="hasSheet===true" @tap="hideSheet"></view>
		<view class="sheet-content"  v-if="hasSheet===true"  :animation="animationData" >
			<view class="sheet-top">
				<image :src="goodsInfo.image" mode="aspectFill"></image>
				<view class="sheet-goodsname">{{goodsInfo.goodsName}}</view>
				<view class="sheet-goodsprice">{{choosePrice}}</view>
			</view>
			<view class="sheet-parm">
				<block v-for="(items,index) in goodsSpec" :key="index">
					<view class="sheet-class-name">{{items.specKey}}</view>
					<view class="sheet-class-list">
						<block v-for="(items,inx) in items.specValue" :key="inx">
							<view :class="['sheet-class-list-item',items.active==true?'active' :'',items.ishide==true?'ishide':'']"  @tap="chooseSpec(index,inx)">{{items.value}}</view>
						</block>
					</view>
				</block>
			</view>
			<view class="sheet-num">
				<label>数量</label>
				<label class="overnum">(库存{{goodsNumber}}件)</label>
				<number-box :min="1" ref="numberbox"></number-box>
			</view>
		</view>


	</view>
</template>

<script> 
	import numberBox from '../../components/number-box.vue'
	export default {
		data() {
			return {
				hasSheet:false,
				goodsID:'',
				goodsInfo:[],
				goodsSpec:[],
				goodsPrice:[],
				choose:[],
				choosePrice:'',
				goodsNumber:'',
				animationData:''
			}
		},
		components: {
			numberBox
		},
		onLoad: function (option) {
			this.goodsID = option.goodsID;
			this.getInfo();
		},
		methods:{
			//选择规格
			chooseSpec:function(row,column){
				//为灰，不可点
				if(this.goodsSpec[row].specValue[column].ishide==true) return;
				//点击的那行如果已经点击过
				if(this.goodsSpec[row].specValue[column].active==true){
					this.goodsSpec[row].specValue[column].active=false;
				}
				else{
					for(var i in this.goodsSpec[row].specValue){
						this.goodsSpec[row].specValue[i].active=false;						
					}
					this.goodsSpec[row].specValue[column].active=true;
				}	
				this.choose=[]
				this.chooseReverse=[]
				this.chooseNot=[]
				this.chooseIn=[]
				for(var i in this.goodsSpec){
					this.chooseNot.push(i)
					for(var j in this.goodsSpec[i].specValue){
						if(this.goodsSpec[i].specValue[j].active==true){
							this.choose.push(this.goodsSpec[i].specValue[j].value)
							this.chooseReverse.unshift(this.goodsSpec[i].specValue[j].value)
							this.chooseIn.unshift(i)
							this.chooseNot.pop()
						}
					}
				}
				//console.log('this.choose:',this.choose)
				this.getGoodsSku();
				this.getPrice();
			},
			//判断sku
			getGoodsSku:function(){
				//找出符合选择的规格的sku
				var arr=this.choose
				var goodsSku=this.filterSku(arr);
				//设置未选择属性中的不可选节点
				for(var i of this.chooseNot){
					this.setSpecHide(i,goodsSku);
				}
				//设置已选属性的不可远节点
				for(var i in this.chooseIn){
					var a=[]
					for(var j in this.choose){
						if(this.choose[j]!=this.chooseReverse[i]){
							a.push(this.choose[j]);			
						}
					}	
					goodsSku=this.filterSku(a);
					var index=this.chooseIn[i]
					this.setSpecHide(index,goodsSku);
				}
			},
			//找出符合选择的规格的所有sku
			filterSku:function(arr){
				var goodsSku=[];
				for(var i in this.goodsSku){
					let isSku=true;
					for(var j in arr){
						if(this.goodsSku[i].goodsSku.indexOf(arr[j])==-1){
							isSku=false;break;
						}
					}
					if(isSku) goodsSku.push(this.goodsSku[i].goodsSku);    
				}
				goodsSku=goodsSku.join(',').split(',');
				return goodsSku
			},
			//设置不可选属性
			setSpecHide:function(index,goodsSku){
				for(var j in this.goodsSpec[index].specValue){
					if(goodsSku.indexOf(this.goodsSpec[index].specValue[j].value)==-1)
						this.goodsSpec[index].specValue[j].ishide=true;
					else
						this.goodsSpec[index].specValue[j].ishide=false;
				}
			},
			//计算价钱
			getPrice:function(){
				this.btnActive=false;
				if(this.choose.length != this.goodsSpec.length) return;
				for(var i in this.goodsSku)
				{		
					if(this.choose.join('')==this.goodsSku[i].goodsSku.join('')) //选择的规格数组和商品规格一致
					{
						//改变数字选择器最大值
						this.numberBoxMax=this.goodsSku[i].stock;
						if(this.$refs.numberbox.value > this.numberBoxMax)
							this.$refs.numberbox.value=this.numberBoxMax
						this.choosePrice='￥'+this.goodsSku[i].price;
						this.goodsNumber=this.goodsSku[i].stock;
						this.btnActive=true;
						break;
					}
				}
			},
			//获取数据
			getInfo:function(){
				uni.showToast({icon: "loading"});
				uni.request({
					url:this.$url+'goodsDetails',
					data:{goodsID:this.goodsID},
					success:(res)=>{	
						res.data.goodsInfo.sowingImage=res.data.goodsInfo.sowingImage.split(',');
						res.data.goodsInfo.detailsImage=res.data.goodsInfo.detailsImage.split(',');												
						if(res.data.goodsInfo.goodsParm.length===0) 
							this.hasGoodsParm=false;
						this.goodsInfo=res.data.goodsInfo;
						this.goodsSpec=res.data.goodsSpec;
						this.goodsSku=res.data.goodsSku;
						for(var i in this.goodsSku){
							this.goodsSku[i].goodsSku=this.goodsSku[i].goodsSku.split(',')
						}
						this.choosePrice=res.data.goodsInfo.priceRange;
						this.goodsNumber=res.data.goodsInfo.stock;
						this.numberBoxMax=res.data.goodsInfo.stock;
						this.setHide()
						uni.hideToast();
					}
				})
			},
			//初始判断是否有库存
			setHide:function(){
				if(this.goodsSpec.length > 1) return;
				for(var i in this.goodsSpec[0].specValue){
					this.goodsSpec[0].specValue[i].ishide=true;
				}
				for(var i in this.goodsSpec[0].specValue){
					for(var j in this.goodsSku){
						if(this.goodsSpec[0].specValue[i].value==this.goodsSku[j].goodsSku.join(''))
							this.goodsSpec[0].specValue[i].ishide=false;
					}
				}
			},
			//预览图片
			previewImage: function (e) {
				var current = e.target.dataset.src;
				uni.previewImage({
					current: current,
					urls: this.goodsInfo.SowingImage
				});
			},
			hideSheet:function(){
				this.hasSheet=false
			},
			showSheet:function(e){
				this.hasSheet=true			
			},
			navigateTo:function(e){
				uni.navigateTo({
					url: '../goods-add/add1/add1?goodsID='+this.goodsInfo.goodsID,
				})
			},
			degoods:function(){
				uni.showModal({
					content: "是否删除？",
					confirmText: "确定",
					cancelText: "取消",
					success:(res)=>{
						if(res.confirm){
							uni.request({
								url:this.$url+'goodsDelete',
								data:{goodsID:this.goodsID},
								success:(res)=>{
									/*var pages = getCurrentPages();
									if (pages.length > 1) {
										//上一个页面实例对象 
										var prePage = pages[pages.length - 2];
										//关键在这里,这里面是触发上个界面的方法 
										prePage.onLoad();  // 123
									}*/
									uni.navigateBack()
								}
							})	
						}
					}
				})		
			}
		},
	}
</script>

<style>
	@import "../../style/uni.css";
	@import "../../style/goods-details.css";
</style>
