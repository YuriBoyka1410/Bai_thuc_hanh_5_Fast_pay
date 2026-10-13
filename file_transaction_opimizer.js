/**
 * FASTPAY TRANSACTION OPTIMIZER
 * Sửa lỗi Infinite Loop và tối ưu Nested Loops
 */

let transactions = [
  { id: "T1", userId: "U01", amount: 500, status: "completed" },
  { id: "T2", userId: "U02", amount: 200, status: "pending" },
  { id: "T3", userId: "U01", amount: 500, status: "completed" },
  { id: "T4", userId: "U03", amount: 150, status: "pending" },
];

/**
 * YÊU CẦU 1
 * Sửa lỗi Infinite Loop
 *
 * Lý do:
 * Biến đếm i phải luôn tăng để tiến về điều kiện dừng.
 * Nếu không tăng i khi gặp status = "pending",
 * vòng lặp sẽ chạy mãi tại cùng một phần tử.
 */
function processPending(data) {
  let i = 0;

  while (i < data.length) {
    if (data[i].status === "pending") {
      console.log("Đang xử lý giao dịch:", data[i].id);
    }

    i++;
  }
}

/**
 * YÊU CẦU 2
 * Tối ưu Nested Loops
 *
 * Lý do:
 * j bắt đầu từ i + 1 để:
 * - Không tự so sánh phần tử với chính nó
 * - Không lặp lại các cặp đã kiểm tra
 * Ví dụ:
 * (T1,T3) đã kiểm tra thì không cần kiểm tra lại (T3,T1)
 *
 * Số vòng lặp giảm từ:
 * n²
 * xuống
 * n(n-1)/2
 */
function findDuplicates(data) {
  let duplicateIds = [];
  let loopCount = 0;

  for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
      loopCount++;

      if (
        data[i].userId === data[j].userId &&
        data[i].amount === data[j].amount
      ) {
        if (!duplicateIds.includes(data[i].id)) {
          duplicateIds.push(data[i].id);
        }

        if (!duplicateIds.includes(data[j].id)) {
          duplicateIds.push(data[j].id);
        }
      }
    }
  }

  console.log("Số vòng lặp tối ưu:", loopCount);

  return duplicateIds;
}

console.log("=== PROCESS PENDING ===");
processPending(transactions);

console.log("\n=== FIND DUPLICATES ===");
console.log(findDuplicates(transactions));
