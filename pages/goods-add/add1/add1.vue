<template>
	<view>
		<view class="list">
			<view class="list-input">
				<input class="input" placeholder="商品名" v-model="inputName" />
			</view>
			<view class="list-input">
				<input class="input" placeholder="类别" v-model="inputType"  />
			</view>
			<view class="title">参数(例 材料:涤纶)</view>
			<block v-for="(item,index) in listParm" :key="index">
				<view class="list-input">
					<input class="short-input"  v-model="item.parm" />:
					<input class="long-input"    v-model="item.parmValue" />				
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
				<view class="button2 up" @tap="navigate()">下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				listParm:[{parm:'',parmValue:''}],
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
				inputSpecValue4:'',
				goodsParm:'',
				goodsSpec:'',
				goodsPrice:'',
				goodsID:''
			}
		},
		onLoad:function(option){
			if(option.goodsID){
				this.goodsID=option.goodsID
				this.getInfo()
			}
		},
		methods:{
			//下一步
			navigate:function(){
				if(this.inputName=='' || this.inputType=='' ){
					uni.showModal({content:'商品名和类别不能为空',showCancel:false})
					return;
				}
				if(((this.inputSpec1=='' && this.inputSpecValue1!='') || (this.inputSpec2=='' && this.inputSpecValue2!='') || (this.inputSpec3=='' && this.inputSpecValue3!='')
				|| (this.inputSpec4=='' && this.inputSpecValue4!='')) 
				|| ((this.inputSpec1!='' && this.inputSpecValue1=='') || (this.inputSpec2!='' && this.inputSpecValue2=='') || (this.inputSpec3!='' && this.inputSpecValue3=='')  
				|| (this.inputSpec4!='' && this.inputSpecValue4=='')))
				{
					uni.showModal({content:'规格填写不正确',showCancel:false})
					return ;
				}
				//商品参数
				for(var i in this.listParm)
				{
					if(this.listParm[i].parm=='' || this.listParm[i].parmValue=='') continue;
					this.goodsParm=this.goodsParm+this.listParm[i].parm+':'+this.listParm[i].parmValue+',';
				}
				//商品规格
				var listSpec=[this.inputSpec1,this.inputSpec2,this.inputSpec3,this.inputSpec4];
				var listSpecValue=[this.inputSpecValue1,this.inputSpecValue2,this.inputSpecValue3,this.inputSpecValue4];
				for(var i in listSpec)
				{
					if(listSpec[i]!='' && listSpecValue[i] != '')
					{
						this.goodsSpec=this.goodsSpec+listSpec[i]+':'+listSpecValue[i]+'-';
					}
				}
				//价格
				var listPrice=[];
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
								if(spec1[i] != '') goodsAllSpec=spec1[i];
								if(spec2[j] != '') goodsAllSpec=goodsAllSpec+ ',' +spec2[j];
								if(spec3[k] != '') goodsAllSpec=goodsAllSpec+ ',' +spec3[k];
								if(spec4[l] != '') goodsAllSpec=goodsAllSpec+ ',' +spec4[l];
								listPrice=listPrice.concat(goodsAllSpec);
							}
						}
					}					
				}				
				if(this.goodsParm!='') this.goodsParm=this.goodsParm.substring(0,this.goodsParm.length-1);
				if(this.goodsSpec!='') this.goodsSpec=this.goodsSpec.substring(0,this.goodsSpec.length-1);
				this.goodsPrice=listPrice.join('-');
				
				var post={};
				var url='';
				if(this.goodsID==''){
					post={goodsName:this.inputName,goodsType:this.inputType,goodsParm:this.goodsParm,goodsSpec:this.goodsSpec,goodsPrice:this.goodsPrice},
					url=this.$url+'goodsAdd1';
				}
				else{
					post={goodsID:this.goodsID,goodsName:this.inputName,goodsType:this.inputType,goodsParm:this.goodsParm,goodsSpec:this.goodsSpec,goodsPrice:this.goodsPrice},
					url=this.$url+'goodsUpdate';
				}
				uni.showLoading({title:''})
				uni.request({
					url: url,
					data: {goodsQuery: JSON.stringify(post) },
					success: (res) => {																	
						console.log('添加成功');		
						console.log(res.data)
						uni.hideLoading()
						if(this.goodsID=='')
							uni.redirectTo({url:'../add2/add2?goodsID='+res.data})
						else
							uni.redirectTo({url:'../add2/add2?goodsID='+this.goodsID})
					},
					fail: (err) => {
						console.log('fail', err);
						uni.hideLoading()
					}								
				})								
			},
			//获取信息
			getInfo:function(){
				uni.request({
					url: this.$url+'unSubmitGoodsDetails1',
					data: {goodsID:this.goodsID},
					success: (res) => {																		
						console.log(res.data);
						this.inputName=res.data.items[0].goodsName;
						this.inputType=res.data.items[0].goodsType;
						var goodsParm=res.data.items[0].goodsParm.split(',');
						this.listParm=[];
						for(var i in goodsParm){
							var str=goodsParm[i].split(':');
							this.listParm=this.listParm.concat({parm:str[0],parmValue:str[1]});
						}
						if(res.data.items[0]){
							this.inputSpec1=res.data.items[0].specKey
							this.inputSpecValue1=res.data.items[0].specValue
						}
						if(res.data.items[1]){
							this.inputSpec2=res.data.items[1].specKey
							this.inputSpecValue2=res.data.items[1].specValue
						}
						if(res.data.items[2]){
							this.inputSpec3=res.data.items[2].specKey
							this.inputSpecValue3=res.data.items[2].specValue
						}
						if(res.data.items[3]){
							this.inputSpec4=res.data.items[3].specKey
							this.inputSpecValue4=res.data.items[3].specValue
						}
					}							
				})	
			},
			//添加input
			addInput:function(){
				this.listParm=this.listParm.concat({parm:'',parmValue:''});
			},
			//删除input
			delInput:function(){
				this.listParm.splice(-1,1);
			},
		}
	}
</script>

<style>
	@import "../../../style/goods-add.css";
</style>
