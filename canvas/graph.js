// 构建图
// 顶点类
function Vertex(label){
    this.label = label;
    // this.distance = distance;
}
// 图类
function Graph(v){
    this.vertices = v;
    this.edges = 0;
    this.adj = [];
    this.marked = []    
// 二维邻接数组初始化
    for(var i = 0;i<this.vertices;++i){
        this.adj[i] = [];
        // this.adj[i].push("");
        this.marked[i] = false;
    }
    this.edgeTo = [];
    this.addEdge = addEdge;
    this.showGraph = showGraph;
    // 深度优先算法
    this.listBorder = listBorder;
    this.dfs = dfs;
    this.removeVertex = removeVertex;
    this.init = init;
    this.bfs = bfs;
    this.getpath=getpath
    this.num = num;
    this.remarker = remarker;
}

function addEdge(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
}

function removeVertex(v){
    // 1.删除v的邻接表的邻接表里的v
    this.adj[v].forEach(function(value){
        for(var w=0;w<this.adj[value].length;++w){
            if(this.adj[value][w] == v){
                this.adj[value].splice(w,1);
            }
        }
    },this)
    //2.删除v的邻接表
    this.adj[v].splice(0,this.adj[v].length);
}

Array.prototype.indexOf = function(el){
    for (var i=0,n=this.length; i<n; i++){
        if (this[i] === el){
            return i;
        }
    }
    return -1;
}

function showGraph(){
    for (var i = 0; i < this.vertices; ++i) {
        str = i + "->";
        for (var j = 0; j < this.vertices; ++j) {
            if (this.adj[i][j] != undefined)
                str += this.adj[i][j] + ' ';
        }
        console.log(str)
    }
}

function dfs(v){
// 用于输出的 if 语句在这里不是必须的
    this.marked[v] = true;
    if (this.adj[v] != undefined)
        // console.log("visit vertex:"+v)
    this.adj[v].forEach(function(value) {
        if (!this.marked[value]) {
            this.dfs(value);
        }
    }, this);
}

// m * m =v
function init(m){
    var v = m*m;
    for(var i=0;i<v;i++){
        // 去重复
        // 判断奇数行还是偶数行
        if(i+1<v&&i%m!=m-1){
            this.addEdge(i,i+1);
        }
        if(i-1>=0&&i%m!=0){
            this.addEdge(i,i-1);            
        }
        if(i-m>=0){
            this.addEdge(i,i-m);
        }
        if(i-m+1>=0&&i-m+1>=Math.floor(i/m)*m){
            this.addEdge(i,i-m+1);
        }
        if(i+m<v){
            this.addEdge(i,i+m);            
        }
        
        if(Math.floor(i/m)%2==0){
            if(i+m-1<v&&i%m!=0){
                this.addEdge(i,i+m-1);            
            }
        }else if(Math.floor(i/m)%2==1){
            if(i+m+1<v&&i%m!=m-1){
                this.addEdge(i,i+m+1);                                          
            }
        }
        
    }
    //1.去重复操作  
    for(var i=0;i<v;i++){
        this.adj[i] = this.adj[i].unique();
    } 
    // 2.初始化时，从邻接数组里random m+1个，放入数组，遍历数组  remove m+1个顶点，变为不可访问
    this.num = randomNum(m+1);
    // console.log(this.num)
    for (var j=0;j<this.num.length;j++){
        this.removeVertex(this.num[j])
    }
}

Array.prototype.contains = function (obj){
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}

function randomNum(n){
    var v = (n-1) *(n-1)-1
    var m = []
    while(m.length<n){
        var number=parseInt(Math.random()*v);  
        if(!m.contains(number)&&number!=60){
            m.push(number)
            arraynum.push(number)
        }
    }
    return m
}

Array.prototype.unique = function(){
    var res = []
    var json = {}
    for (var i=0;i<this.length;i++){
        if(!json[this[i]]){
            res.push(this[i])
            json[this[i]]=1
        }
    }
    return res
}

// 列出边界点的数组
function listBorder(m){

    for(var i =0;i<m;i++){
        if(this.adj[i * m].length!=0) {
            borderVertext.push(i * m);
        }
        if(this.adj[(i + 1) * m - 1].length!=0){
            borderVertext.push((i + 1) * m - 1)
        }
    }
    for(var i = 1;i<=m-2;i++){
        if(this.adj[i].length!=0){
            borderVertext.push(i)
        }
    }
    for(var i=m*(m-1)+1;i<=m*m-1;i++){
        if(this.adj[i].length!=0){
            borderVertext.push(i);
        }
    }
}


//再列出到边界点的最短距离算法
// 使用bfs求解无权无向图的最短路径
// a为当前点的位置
// length数组，路径或者得出下一步的最优解数组
//广度优先
//把最短路径和长度给我算出来
function bfs(s){
    arrlength[s] = 0
    isInPath.splice(0)
    var queue = [];//队列
    this.marked[s] = true;
    queue.push(s);    //添加到队尾,如果用unshift则会由右往左遍历，显示0 2 1 3 4   
    while(queue.length > 0){  
        var v = queue.shift();//从队首移除  
        isInPath.push(v)
        if(typeof(v) != 'string'){  
            // console.log("Visited vertex:" + v);
        };
        for(var w of this.adj[v]){  
            if(!this.marked[w]){  
                this.edgeTo[w] = v;
                arrlength[w] = arrlength[v]+1
                this.marked[w] = true;
                queue.push(w);  
            }
        }
    }
}

//复位marker
function remarker() {
    for(var i =0;i<this.vertices;i++){
        this.marked[i] = false;
    }
}

function getpath(arr,local){
//    宽度优先,他相同length 的 path是同级的?
//    找到第一个属于bordervertex的即可
    var count;
    var minlength = arrlength[borderVertext[0]];
    var minindex = 0;
    // console.log(arrlength)
    /*
    * todo 会有问题
    * */
    for(var i=1;i<borderVertext.length;i++){
        if(minlength>arrlength[borderVertext[i]])
        {
            minlength = arrlength[borderVertext[i]];
            minindex = i;
        }
    }
    console.log(borderVertext)
    console.log("minidnex:"+minindex+" minnum:"+borderVertext[minindex])
    console.log("minlength:"+minlength)
    console.log(arrlength)
    for(var i=0;i<arr.length;i++){
        //不能使用第一个,第一个不一定是最优解
        //需要找到最短长度的那个边缘节点
        if(arr[i]==borderVertext[minindex]){
            count = arr[i];
            break;
        }
    }
    while(this.edgeTo[count]!=local&&this.edgeTo[count]!=undefined){
        count = this.edgeTo[count]
    }
    if(count!=undefined){
        return count
    }else{
        return -1
    }
}

// 数据填入 0~120个顶点
// 1.首先121个点都默认
//test
var borderVertext = []
var arraynum = []
//已经点击的点
var num = []
var dfsarr = []
//记录每一层的个数
var floorcount = []
//最短长度
var arrlength = []
//最短路径
var path = []
var isInPath = []
var nextNode
var finalNodenum



