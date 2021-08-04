<!--
 * @Descripttion: 
 * @Author: renmingming
 * @Date: 2021-07-31 10:29:39
 * @LastEditors: renmingming
 * @LastEditTime: 2021-08-04 15:17:38
-->
## 二分法

  - 取中间值、最大值、最小值，目标值和中间值对比，剔除一半
  - 重复上一步骤，直到中间值和目标值相同
  - 否则目标值不存在
  
  ```
  const arr = [2, 3, 4, 6, 8, 11, 15, 16, 19, 22, 26]

    function search(arr, val) {
      const len = arr.length
      let minIndex = 0
      let maxIndex = len - 1
      while (minIndex <= maxIndex) {
        let midIndex = Math.floor((minIndex + maxIndex) / 2)
        let mid = arr[midIndex]
        if (mid === val) {
          return midIndex
        }
        if (mid > val) maxIndex = midIndex - 1 
        if (mid < val) minIndex = midIndex + 1
      }
      return -1
    }

    function binarySearch(arr,minIndex, maxIndex, val) {
      if (minIndex > maxIndex) return -1
      const len = arr.length
      let midIndex = Math.floor((minIndex + maxIndex) / 2)
      let mid = arr[midIndex]
        if (mid === val) {
          return midIndex
        }
        if (mid > val) {
          maxIndex = midIndex - 1
          return binarySearch(arr, minIndex, maxIndex, val)
        }
        if (mid < val) {
          minIndex = midIndex + 1
          return binarySearch(arr, minIndex, maxIndex, val)
        }
    }
  ```

  ### 出问题的版本号
  - 1-n版本号，某一版本出问题，导致后续版本都有问题，请求api最少求出该版本号
  ```
  // 模拟请求，从4版本开始都有问题
   function isBadVersion(n) {
     return n >= 4
   }

   function search(n) {
     let left = 1;
     let right = n;
     while(left < right>) {
       let mid = parseInt((left + right) / 2)
       if (isBadVersion(mid)) {
         right = mid
       } else {
         left = mid + 1
       }
     }
     return left
   }
  ```

  ### 求某个值的位置，没有则显示插入的位置

  ```
  function searchOrInsert(nums, target) {
    let minIndex = 0;
    let maxIndex = nums.length - 1;
    while(minIndex <= maxIndex) {
      let midIndex = parseInt((minIndex + maxIndex) / 2)
      let mid = nums[midIndex]
      if (mid > target) {
        maxIndex = midIndex - 1
      } else if (mid < target) {
        minIndex = midIndex + 1
      }
    }
    return minIndex;
  }
  ```
## 双指针
  ### 翻转
  ```
    // 可根据k值反转个数
    function rotate(nums, k) {
      const len = nums.length;
      const count = 0;
      k = k % len
      for (let i = 0; count < len; i++) {
        let cur = i;
        let pre = nums[cur]
        do {
          let next = (cur + k) % len;
          let temp = nums[next];
          nums[next] = pre;
          cur = next;
          pre = temp;
          count++;
        } while(i !== cur)
      }
    }

    function rotate(nums, k) {
      const len = nums.length;
      let newArr = []
      for (let i = 0; i < len; i++) {
        newArr[(i + k) % len] = nums[i]
      }
      return newArr
    }
  ```

  ### 移动0到末尾

  ```
    function move(nums) {
      let len = nums.length;
      let left = 0;
      let right = 0;
      while (right < len) {
        if (nums[right] !== 0) {
          if (left < right) {
            let temp = nums[right]
            nums[right] = nums[left]
            nums[left] = temp
          }
          left++;
        }
        right++;
      }
    }
  ```

  ### 求数组中两个值相加等于指定值
  ```
// 缩减搜索空间
function twoSum(nums, target) {
  let left = 0;
  let right = nums.length -1;
  while(left < nums.length>) {
    let sum = nums[left] + nums[right]
    // 每判断一次，缩减一行
    if (sum < target) {
      left++
    } else if (sum > target) {
      right--
    } else {
      return [left, right]
    }
  }
}
  ```
### 翻转数组字符串

```
function reverseStr(s) {
  let left = 0;
  let right = s.length - 1
  while(left < right) {
    let temp = s[left]
    s[left] = s[right]
    s[right] = temp
  }
  return s
}
['r', 'e', 'n'] // ['n', 'e', 'r']
```

### 翻转字符串中的单词

```
function reverseWord(s) {
  let len = s.length
  let i = 0
  let str = ''
  while(i < len) {
    let start = i
    while(i < len && s.charAt(i) !== ' ') {
      i++
    }
    for (let n = i - 1; n >= start; n--) {
      str += s.charAt(n)
    }
    while(i < len && s.charAt(i) === ' ') {
      str += ' '
      i++
    }
  }
  return s
}
```

### 求链表的中间节点，有两个返回第二个节点

```
// 快慢指针法，两个指针fast和slow，slow一次走一步，fast一次走两步，fast走到末尾，slow则在中间
function middleNode(head) {
  let slow = fast = head;
  while(fast && fast.next) {
    slow= slow.next
    fast = fast.next.next
  }
  return slow
}
```

### 删除链表倒数第n个节点

也可以使用快慢双指针，先让快指针走n个节点，在两个指针一起走，快指针走到末尾，慢指针就是要删除的节点