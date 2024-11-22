

function node(val) {

	this.value = val;

	this.leftNode = null;

	this.rightNode = null;

	this.height = 1;

}



function AVLTree() {

	var root = null;

	this.getHeight = function (n) {

		if (n == null ) {

			return 0;

		}

		return n.height;

	};

	this.rightRotate = function(curRoot) {

		var newRoot = curRoot.leftNode;

		var newLeftNode = newRoot.rightNode;

		var newRightNode = curRoot;



	    newRoot.rightNode = newRightNode;
		newRightNode.leftNode = newLeftNode;



		newRightNode.height = Math.max(this.getHeight(newRightNode.leftNode),

				this.getHeight(newRightNode.rightNode)) + 1;



		newRoot.height = Math.max (this.getHeight(newRoot.leftNode),

				this.getHeight(newRoot.rightNode)) + 1;



		return newRoot;

	};

	this.leftRotate = function(curRoot) {

		var newRoot = curRoot.rightNode;

		var newRightNode = newRoot.leftNode;

		var newLeftNode = curRoot;



		newRoot.leftNode = newLeftNode;

		newLeftNode.rightNode = newRightNode;



		newLeftNode.height = Math.max(this.getHeight(newLeftNode.leftNode),

				this.getHeight(newLeftNode.rightNode)) + 1;



		newRoot.height = Math.max(this.getHeight(newRoot.leftNode),

				this.getHeight(newRoot.rightNode)) + 1



	return newRoot;

}



// get balance of subtree rooted at n

// return > 0 if the left subtree is higher

this.getBalance = function (n) {

	if (n == null) {

		return 0;

	}

	return this.getHeight(n.leftNode) - this.getHeight(n.rightNode);

};



this.insert = function (n, val) {

	if (n == null) {

		return new node(val);

	}



// normal BST insert

	if (val >= n.value) {

		n.rightNode = this.insert(n.rightNode, val);

	} else if (val < n.value) {

		n.leftNode = this.insert(n.leftNode, val);

	}



// update height

	n.height = Math.max(this.getHeight(n.leftNode), this.getHeight(n.rightNode)) + 1;

	var balance = this.getBalance(n);



// left left

	if (balance > 1 && n.leftNode && val < n.leftNode.value) {

		return this.rightRotate(n);

	}



// right right

	if (balance < -1 && n.rightNode && val > n.rightNode.value) {

		return this.leftRotate(n);

	}



// left right

	if (balance > 1 && n.leftNode && val >= n.leftNode.value) {

		n.leftNode = this.leftRotate(n.leftNode);

		return this.rightRotate(n);

	}



// right left

	if (balance < -1 && n.rightNode && val < n.rightNode.value) {

		n.rightNode = this.rightRotate(n.rightNode);

		return this.leftRotate(n);

	}



	return n;

};



	this.remove = function (n, val) {

		if (n == null) {

			return n;

		}

	// normal BST delete

		if (val < n.value) {

			n.leftNode = this.remove(n.leftNode, val);

		} else if (val > n.value) {

			n.rightNode = this.remove(n.rightNode, val);

		} else {

			if ((n.leftNode == null) || (n.rightNode == null)) {

				// case: node has 0 or 1 child

				var tmp;

				if  (n.leftNode) {

					tmp = n.leftNode;

				} else  {

					tmp = n.rightNode;

				}



				if (tmp == null) {

					n = null;

				} else {

				//dont know if it's right

					// n = tmp;

					n.value = tmp.value;

					n.leftNode = tmp.leftNode;

					n.rightNode = tmp.rightNode;

					n.height = tmp.height;

				}

			} else {

				// case: node has 2 children

				// get smallest node in right subtree

				var tmp = n.rightNode;

				while (tmp.leftNode != null) {

					tmp = tmp.leftNode;

				}

				// copy it to subtree's root

				n.value = tmp.value;

				// delete it

				n.rightNode = this.remove(n.rightNode, tmp.value);

			}

		}

		if (n == null)

			return n;



	// update height

		n.height = Math.max(this.getHeight(n.leftNode), this.getHeight(n.rightNode)) + 1;



		var  balance = this.getBalance(n);



	// Left Left

		if (balance > 1 && this.getBalance(n.leftNode) >= 0) {

			return this.rightRotate(n);

		}



	// Left Right

		if (balance > 1 && this.getBalance(n.leftNode) < 0) {

			n.leftNode = this.leftRotate(n.leftNode);

			return this.rightRotate(n);

		}



	// Right Right

		if (balance < -1 && this.getBalance(n.rightNode) <= 0) {

			return this.leftRotate(n);

		}



	// Right Left

		if (balance < -1 && this.getBalance(n.rightNode) > 0) {

			n.rightNode = this.rightRotate(n.rightNode);

			return this.leftRotate(n);

		}



		return n;

	};



	this.insertNode = function(val) {

		//document.write(val);

		root = this.insert(root, val);

	};



	this.deleteNode = function(val) {

		root = this.remove(root, val);

	};



	this.inOrder = function(n) {

		if (n == null) {

			return;

		}

		 document.write(" 	 " + n.value + " ");

		this.inOrder(n.leftNode);

		this.inOrder(n.rightNode);

	};



	this.preOrder = function (n) {

		if (n == null) {

			return;

		}

		document.write(n.value +  " ") ;

		this.preOrder(n.leftNode);

		this.preOrder(n.rightNode);

	};



	this.postOrder = function (n) {

		if (n == null) {

			return;

		}

		this.postOrder(n.leftNode);

		this.postOrder(n.rightNode);

		document.write(n.value +  " ") ;

	};



	this.getRoot = function () {

		return root;

	};

	

	// cur_node is the AVL node object

	// parent_node is an object that contains properties "parent" and "text"

	

	this.dfs = function(cur_node, parent_node) {

    if (cur_node == null) {

      return [];

    }

    tree_nodes = [];

	  if (cur_node == root) {

	    var parent_node = {text: {name: cur_node.value}};

	    tree_nodes.push(parent_node);

	  }

	  if (cur_node.leftNode != null) {

	    var left_node = {parent: parent_node, text: {name: cur_node.leftNode.value}};

	    tree_nodes.push(left_node);

    }

    if (cur_node.rightNode != null) {

      var right_node = {parent: parent_node, text: {name: cur_node.rightNode.value}};

    	tree_nodes.push(right_node);

    }

    tree_nodes = tree_nodes.concat(this.dfs(cur_node.leftNode, left_node));

    tree_nodes = tree_nodes.concat(this.dfs(cur_node.rightNode, right_node));

    return tree_nodes;

  }

}





/*** Example Input ***/

// n = 0, so that the tree starts empty at first, no need for manual input now

var n = 0;

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];



var b = new AVLTree();



for (var i = 0 ; i < n; i++) {

	b.insertNode(a[i]);

}

/********************/



config = {

    container: "#tree-container",
    animateOnInit : true ,
   
    node: {
                collapsable: true
            },
            animation: {
                nodeAnimation: "easeOutBounce",
                nodeSpeed: 700,
                connectorsAnimation: "bounce",
                connectorsSpeed: 700
           }

};



chart_config = [config].concat(b.dfs(b.getRoot(), null));
var chart = new Treant(chart_config);
/*** Add Node is called from HTML ***/

function checkIfExists(searchNode) {
	for(var i = 1; i < chart_config.length; i++)
	{
		var node = chart_config[i].text.name;
		if(node == searchNode)
		{
			//simple_chart_config[i].text.name = "<h2>" + node + "</h2>";
			return true;
		}
	}
	return false;

}
function checkIfEmpty(value) {
	if (value == null || value == "") {
		return true;
	}
	else{
		return false;
	}
	
}
function addNode() {

	if(checkIfExists(document.getElementById('nodeAddText').value)  )
		alert("You can't insert an existing value");
	else
	{
		if(checkIfEmpty(document.getElementById('nodeAddText').value))
		{
			alert("You must write value");
		}
		else
		{
			b.insertNode(+document.getElementById('nodeAddText').value);

		  chart_config = [config].concat(b.dfs(b.getRoot(), null));

		  var chart = new Treant(chart_config);

		  document.getElementById('nodeAddText').value = '';
		}
			
	}
  

}





/*** Delete Node is called from HTML ***/

function deleteNode() {

  b.deleteNode(+document.getElementById('nodeDeleteText').value);

  chart_config = [config].concat(b.dfs(b.getRoot(), null));

  var chart = new Treant(chart_config);

  document.getElementById('nodeDeleteText').value = '';

}

function searchNode() {
	var searchNode = document.getElementById("searchNode").value;
	for(var i = 1 ; i < chart_config.length; i++)	
	{
		var node = chart_config[i].text.name;
		if(node == searchNode)
		{
			//simple_chart_config[i].text.name = "<h2>" + node + "</h2>";
			chart_config[i].HTMLid = "found";

			var chart = new Treant(chart_config);
			console.log("found");
			return;
		}
	}
	alert("Not found");		
}


