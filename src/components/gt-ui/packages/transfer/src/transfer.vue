<template>
    <div class="gt-transfer">
        <el-dialog
                title="分配餐桌"
                :visible.sync="dialogVisible">
            <slot></slot>
            <div class="gt-transfer-content">
                <div class="gt-transfer-left" v-if="label">
                    <el-table
                            :data="data"
                            ref="multipleTable"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection">
                        </el-table-column>

                        <el-table-column
                                v-for="(item,index) in label"
                                :key="index"
                                :prop="prop[index]"
                                :label="item">
                        </el-table-column>
                    </el-table>
                </div>

                <div class="gt-transfer-right">
                    <!--<el-table-->
                            <!--:data="changeList">-->
                        <!--<el-table-column-->
                                <!--:label="'已选择：'+changeList.length">-->
                            <!--<template scope="scope" v-if="scope.row">-->
                                <!--<span>{{scope.row.tabName}}</span>-->
                                <!--<el-button type="text" size="mini" class="fl-r">删除</el-button>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    <!--</el-table>-->
                    <header>已选择：{{changeList.length}}</header>
                    <section>
                        <table cellspacing="0" cellpadding="0" border="0">
                            <tr v-for="item in changeList" v-if="item" :key="item.id">
                                <td>
                                    <span class="fl-l">{{item.tabName}}</span>
                                    <el-button type="text" size="mini" @click="tapRemvoe(item.id)">删除</el-button>
                                </td>
                            </tr>
                        </table>
                        <!--<div v-for="item in changeList" v-if="item" :key="item.id">-->
                            <!--<span>{{item.tabName}}</span>-->
                            <!--<el-button type="text" size="mini" class="fl-r">删除</el-button>-->
                        <!--</div>-->
                    </section>
                </div>
            </div>

            <div class="gt-transfer-footer" v-if="dialogVisible">
                <div class="inb-block">
                    <el-pagination
                            :page-size="pageSize"
                            layout="prev, pager, next, jumper"
                            :total="total"
                            @current-change="handleCurrentChange">
                    </el-pagination>
                </div>

                <div class="fl-r">
                    <el-button type="primary" @click="confirm">确认</el-button>
                    <el-button @click="dialogVisible=false">取消</el-button>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>

  import util from '../../../util/util.js'

	export default {
		name:'GtTransfer',
		props: {
			data:{
				type: Array
			},
			selected:{
				type: Array
            },
			prop:{
				type: Array
            },
			label:{
        type: Array
      },
			visible:{
				type: Boolean
            },
			pageSize:{
				type: [Number,String]
            },
			total:{
				type: [Number,String]
            }
		},
		data() {
			return {
				dialogVisible: false,
				flip: false,
                changeArrayList: [],
				changeList: [],
                changeListOld: [],
                page: 1,
            }
		},
        watch:{
	        data(_new){
				var self = this,
				    changeList = self.changeList,
				    changeListOld = self.changeListOld,
				    changeArrayList = self.changeArrayList;
				if(_new==undefined||_new=='')return;
				if(changeList.length>0&&self.flip)changeListOld = changeListOld.concat(changeList);
				if(changeListOld.length>0){
					_new.forEach(row => {
            for(let i=0; i<changeListOld.length; i++){
              if(row.id == changeListOld[i].id){
                if(changeArrayList[self.page] == undefined)changeArrayList[self.page]=[];
                changeArrayList[self.page].push(row);
                changeListOld.splice(i,1);
                break;
                }
            }
					});
					this.changeArrayList.splice(1,0)
                }
                var changeArrayList = util.copy(changeArrayList[self.page] || []);
		        self.flip = true;
                if(changeArrayList.length>0){
	                self.$nextTick(function () {
		                _new.forEach(row => {
			                for(let i=0;i<changeArrayList.length;i++){
				                if(row.id == changeArrayList[i].id){
					                self.$refs.multipleTable.toggleRowSelection(row);
					                changeArrayList.splice(i,1);
					                break;
				                }
			                }
		                });
	                });
                }
            },
	        selected(_new){
		        this.changeListOld = _new;
            },
	        visible(_new){
                this.dialogVisible = _new;
            },
	        dialogVisible(_new){
	        	var self = this;
		        self.$emit('update:visible',_new)

                if(!_new){
	                self.$nextTick(function () {
		                self.flip = false;
		                self.changeArrayList = [];
		                self.changeList = [];
		                self.changeListOld = [],
			                self.page = 1;
	                })
                }
            },
	        changeArrayList(_new){
		        var self = this;
		        self.changeList = [];
		        _new.forEach(e => {
			        self.changeList = self.changeList.concat(e)
		        });
		        self.changeList = self.changeList.concat(self.changeListOld)
            },
        },
		components: {},
		//实例初始化最之前，无法获取到data里的数据
		beforeCreate() {

		},
		//在挂载开始之前被调用
		beforeMount() {
			this.dialogVisible = this.visible;
		},
		//已成功挂载，相当ready()
		mounted() {

		},
		//相关操作事件
		methods: {
			/**
             * 勾选复选框
             */
			handleSelectionChange(rows){
				this.changeArrayList[this.page] = rows;
				this.changeArrayList.splice(1,0);
            },
			/**
             * 翻页
			 * @param index
			 */
			handleCurrentChange(index){
				var self = this;
				self.flip = false;
                self.page = index;
				self.$emit('current-change',index)
            },
			/**
             * 确定
			 */
			confirm(){
				var self = this;
                self.$emit('confirm',self.changeList);
				self.dialogVisible = false;
            },
			/**
             * 删除
			 * @param id
			 */
			tapRemvoe(id){
				var self = this,
                    id = id,
				    changeArrayList = self.changeArrayList,
				    changeList = self.changeList,
				    changeListOld = self.changeListOld;

				for(let i in changeArrayList){
					let br = false;
					for(let j in changeArrayList[i]){
                        if(changeArrayList[i][j].id == id){
                            changeArrayList[i].splice(j,1);
                            br = true;
                            break;
                        }
					}
					if(br)break;
                }
                for(let i in changeListOld){
                    if(changeListOld[i].id == id){
	                    changeListOld.splice(i,1);
	                    break;
                    }
                }
				for(let i in changeList){
					if(changeList[i].id == id){
						changeList.splice(i,1);
						break;
					}
				}

			}
        }
	}

</script>

<style lang="less" scoped>
    .gt-transfer{
        ::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
            background-color:#f8f8f8;
        }
        ::-webkit-scrollbar {//滚动条的宽度
            width:9px;
            height:9px;
        }
        ::-webkit-scrollbar-thumb {//滚动条的设置
            background-color:#dddddd;
            background-clip:padding-box;
            min-height:28px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color:#bbb;
        }
        &-content{
            position: relative;
        }
        &-left{
            padding-right: 258px;
        }
        &-right{
            width: 236px;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            border: 1px solid #dfe6ec;
            .el-table{
                height: 100%;
                overflow-y: auto;
            }
            .el-table td{
                border-bottom: 1px solid transparent;
            }
            header{
                width: 100%;
                line-height: 40px;
                background-color: #eef1f6;
                padding: 0 20px;
                color: rgb(31, 45, 61);
                font-weight: 700;
                position: absolute;
                top: 0;
                box-sizing: border-box;
            }
            section{
                height: 100%;
                padding: 40px 20px;
                overflow-y: auto;
                box-sizing: border-box;
                table{
                    width: 100%;
                    td{
                        height: 40px;
                        text-align: right;
                        color: #333333;
                    }
                }
            }
        }
        .fl-r{
            float: right;
        }
        .fl-l{
            float: left;
        }

        &-footer{
            text-align: center;
            padding-top: 20px;
            .inb-block{
                display: inline-block;
            }
        }
    }
</style>
