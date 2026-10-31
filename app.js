let employees = [
  { employeeCode: "EMP-001", fullName: "Ngô Thanh Tùng", department: "Phòng Kỹ Thuật", age: 28, experienceYears: 5 },
  { employeeCode: "EMP-002", fullName: "Hồ Thị Thu", department: "Phòng Nhân Sự", age: 35, experienceYears: 10 },
  { employeeCode: "EMP-003", fullName: "Mai Quốc Việt", department: "Phòng Kỹ Thuật", age: 24, experienceYears: 1 }
];

let running = true;

while (running) {
  let menu = "==================================================\n" +
             "HỆ THỐNG QUẢN LÝ NHÂN VIÊN CÔNG TY SKYTECH\n" +
             "==================================================\n" +
             "1. Hiển thị danh sách nhân viên\n" +
             "2. Thêm nhân viên mới\n" +
             "3. Cập nhật thông tin nhân viên\n" +
             "4. Xóa nhân viên\n" +
             "5. Tìm kiếm nhân viên theo phòng ban\n" +
             "0. Thoát chương trình\n" +
             "==================================================\n" +
             "Vui lòng nhập lựa chọn của bạn (0 - 5):";

  let choiceInput = prompt(menu);

  if (choiceInput === null) {
    console.log("Cảm ơn bạn đã sử dụng chương trình. Hẹn gặp lại!");
    break;
  }

  let choice = choiceInput.trim();

  switch (choice) {
    case "1":
      if (employees.length === 0) {
        console.log("Danh sách nhân viên trống.");
      } else {
        for (let i = 0; i < employees.length; i++) {
          let emp = employees[i];
          console.log((i + 1) + ". " + emp.employeeCode + " - " + emp.fullName + " - " + emp.department + "\n   Tuổi: " + emp.age + " | Số năm kinh nghiệm: " + emp.experienceYears);
        }
        console.log("Tổng: " + employees.length + " nhân viên");
      }
      break;

    case "2":
      let codeInput = prompt("Nhập mã nhân viên (ví dụ: EMP-004):");
      if (codeInput === null) {
        console.log("Hủy thao tác thêm.");
        break;
      }
      let code = codeInput.trim().toUpperCase();

      let codeError = "";
      if (code === "") {
        codeError = "Lỗi: Chưa nhập mã nhân viên";
      } else if (code.length < 6) {
        codeError = "Lỗi: Độ dài nhỏ hơn 6 ký tự";
      } else if (!code.startsWith("EMP-")) {
        codeError = "Lỗi: Sai tiền tố \"EMP-\"";
      } else if (code.includes(" ")) {
        codeError = "Lỗi: Chứa khoảng trắng";
      } else {
        let exists = false;
        for (let i = 0; i < employees.length; i++) {
          if (employees[i].employeeCode === code) {
            exists = true;
            break;
          }
        }
        if (exists) {
          codeError = "Lỗi: Mã nhân viên đã tồn tại";
        }
      }

      if (codeError !== "") {
        console.log(codeError);
        break;
      }

      let nameInput = prompt("Nhập họ tên nhân viên:");
      if (nameInput === null) {
        console.log("Hủy thao tác thêm.");
        break;
      }
      let rawName = nameInput.trim();
      if (rawName === "") {
        console.log("Lỗi: Họ tên không được để trống.");
        break;
      }
      let nameWords = rawName.split(/\s+/);
      let normalizedName = "";
      for (let i = 0; i < nameWords.length; i++) {
        let word = nameWords[i];
        let formattedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        if (i === 0) {
          normalizedName += formattedWord;
        } else {
          normalizedName += " " + formattedWord;
        }
      }

      let deptInput = prompt("Nhập phòng ban:");
      if (deptInput === null) {
        console.log("Hủy thao tác thêm.");
        break;
      }
      let rawDept = deptInput.trim();
      if (rawDept === "") {
        console.log("Lỗi: Phòng ban không được để trống.");
        break;
      }
      let deptWords = rawDept.split(/\s+/);
      let normalizedDept = "";
      for (let i = 0; i < deptWords.length; i++) {
        let word = deptWords[i];
        let formattedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        if (i === 0) {
          normalizedDept += formattedWord;
        } else {
          normalizedDept += " " + formattedWord;
        }
      }

      let ageInput = prompt("Nhập tuổi (18 - 60):");
      if (ageInput === null) {
        console.log("Hủy thao tác thêm.");
        break;
      }
      let age = Number(ageInput.trim());
      if (isNaN(ageInput.trim()) || !Number.isInteger(age) || age < 18 || age > 60) {
        console.log("Lỗi: Tuổi phải là số nguyên từ 18 đến 60.");
        break;
      }

      let expInput = prompt("Nhập số năm kinh nghiệm (0 - 40):");
      if (expInput === null) {
        console.log("Hủy thao tác thêm.");
        break;
      }
      let exp = Number(expInput.trim());
      if (isNaN(expInput.trim()) || !Number.isInteger(exp) || exp < 0 || exp > 40) {
        console.log("Lỗi: Số năm kinh nghiệm phải là số nguyên từ 0 đến 40.");
        break;
      }

      let newEmp = {
        employeeCode: code,
        fullName: normalizedName,
        department: normalizedDept,
        age: age,
        experienceYears: exp
      };
      employees.push(newEmp);
      console.log("Thêm nhân viên thành công:\n" + code + " - " + normalizedName + " - " + normalizedDept);
      break;

    case "3":
      let searchCodeInput = prompt("Nhập mã nhân viên cần cập nhật:");
      if (searchCodeInput === null) break;
      let searchCode = searchCodeInput.trim().toUpperCase();

      let foundIndex = -1;
      for (let i = 0; i < employees.length; i++) {
        if (employees[i].employeeCode === searchCode) {
          foundIndex = i;
          break;
        }
      }

      if (foundIndex === -1) {
        console.log("Không tìm thấy nhân viên có mã \"" + searchCode + "\".");
      } else {
        let currentEmp = employees[foundIndex];
        let oldAge = currentEmp.age;
        let oldExp = currentEmp.experienceYears;

        let newAgeInput = prompt("Nhập tuổi mới (18 - 60). Bấm Cancel để giữ nguyên (" + oldAge + "):");
        let newAge = oldAge;
        if (newAgeInput !== null) {
          let parsedAge = Number(newAgeInput.trim());
          if (!isNaN(newAgeInput.trim()) && Number.isInteger(parsedAge) && parsedAge >= 18 && parsedAge <= 60) {
            newAge = parsedAge;
          } else {
            console.log("Tuổi nhập không hợp lệ, giữ nguyên giá trị cũ.");
          }
        }

        let newExpInput = prompt("Nhập số năm kinh nghiệm mới (0 - 40). Bấm Cancel để giữ nguyên (" + oldExp + "):");
        let newExp = oldExp;
        if (newExpInput !== null) {
          let parsedExp = Number(newExpInput.trim());
          if (!isNaN(newExpInput.trim()) && Number.isInteger(parsedExp) && parsedExp >= 0 && parsedExp <= 40) {
            newExp = parsedExp;
          } else {
            console.log("Số năm kinh nghiệm nhập không hợp lệ, giữ nguyên giá trị cũ.");
          }
        }

        currentEmp.age = newAge;
        currentEmp.experienceYears = newExp;
        console.log("Cập nhật thành công! Tuổi/Kinh nghiệm trước: " + oldAge + "/" + oldExp + " | Sau: " + newAge + "/" + newExp);
      }
      break;

    case "4":
      let delCodeInput = prompt("Nhập mã nhân viên cần xóa:");
      if (delCodeInput === null) break;
      let delCode = delCodeInput.trim().toUpperCase();

      let foundIndexDel = -1;
      for (let i = 0; i < employees.length; i++) {
        if (employees[i].employeeCode === delCode) {
          foundIndexDel = i;
          break;
        }
      }

      if (foundIndexDel === -1) {
        console.log("Không tìm thấy nhân viên có mã " + delCode + ".");
      } else {
        employees.splice(foundIndexDel, 1);
        console.log("Đã xóa thành công nhân viên mã: " + delCode);
      }
      break;

    case "5":
      let deptQueryInput = prompt("Nhập tên phòng ban cần tìm kiếm:");
      if (deptQueryInput === null) break;
      let deptQuery = deptQueryInput.trim().toLowerCase();

      let count = 0;
      for (let i = 0; i < employees.length; i++) {
        let emp = employees[i];
        if (emp.department.toLowerCase().includes(deptQuery)) {
          count++;
          console.log(count + ". " + emp.employeeCode + " - " + emp.fullName + " - " + emp.department);
        }
      }
      if (count === 0) {
        console.log("Không tìm thấy nhân viên nào thuộc phòng ban phù hợp.");
      } else {
        console.log("Tìm thấy " + count + " nhân viên.");
      }
      break;

    case "0":
      console.log("Cảm ơn bạn đã sử dụng chương trình. Lời chào và kết thúc chương trình!");
      running = false;
      break;

    default:
      console.log("Lựa chọn không hợp lệ (0 - 5). Vui lòng nhập lại.");
      break;
  }
}