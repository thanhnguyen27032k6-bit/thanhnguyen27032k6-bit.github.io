// js/data.js
// Dataset sản phẩm WatchStore - 50 sản phẩm
// Mỗi sản phẩm gồm: id, name, brand, category, price, oldPrice, image, sku, description, specs
// Giá để dạng số (VND) để dễ tính toán trong code.

const PRODUCTS   = [
    // XU HƯỚNG
    {
      id: "P001",
      name: "Orient 40.8mm RA-AR0007S30B (RA-AR0007S10B)",
      brand: "Orient",
      category: "xuhuong",
      price: 10408000,
      oldPrice: 13010000,
      image: "image/DONGHOXUHUONG/ra-ar0007s10b-1-633473945-6512684-1712670699-400x400.jpg",
      sku: "OR-RA-AR0007S",
      description: "Orient 40.8mm, thiết kế cổ điển, mặt kính sapphire, chống nước cơ bản.",
      specs: { size: "40.8mm", movement: "Automatic", waterResistance: "50m" }
    },
    {
      id: "P002",
      name: "Seiko 37mm SNK807K2",
      brand: "Seiko",
      category: "xuhuong",
      price: 5040000,
      oldPrice: 5600000,
      image: "image/DONGHOXUHUONG/snk807k2-1712554669-400x400.jpg",
      sku: "SE-SNK807",
      description: "Seiko classic 37mm, phù hợp hàng ngày.",
      specs: { size: "37mm", movement: "Automatic", waterResistance: "30m" }
    },
    {
      id: "P003",
      name: "Bentley 34mm BL1869-101LWWB",
      brand: "Bentley",
      category: "xuhuong",
      price: 3370000,
      oldPrice: 4500000,
      image: "image/DONGHOXUHUONG/bg5804-a2-1-750261156-1218272464-1712669786-400x400.jpg",
      sku: "BE-BL1869",
      description: "Thiết kế nhỏ gọn 34mm, phong cách thanh lịch.",
      specs: { size: "34mm", movement: "Quartz", waterResistance: "30m" }
    },
    {
      id: "P004",
      name: "Citizen 30mm EM0320-59D",
      brand: "Citizen",
      category: "xuhuong",
      price: 7670000,
      oldPrice: 11800000,
      image: "image/DONGHOXUHUONG/bl1869-101lwwb-2-1675846115609-1712591040-400x400.jpg",
      sku: "CI-EM0320",
      description: "Citizen nữ 30mm, thiết kế sang trọng.",
      specs: { size: "30mm", movement: "Quartz", waterResistance: "50m" }
    },
    {
      id: "P005",
      name: "Olym Pianus 40mm OP89322GSR-N",
      brand: "Olym Pianus",
      category: "xuhuong",
      price: 3950000,
      oldPrice: 4740000,
      image: "image/DONGHOXUHUONG/em0320-59d-1712572339-400x400.jpg",
      sku: "OP-89322",
      description: "OP 40mm phong cách cổ điển, kính chịu lực.",
      specs: { size: "40mm", movement: "Automatic", waterResistance: "30m" }
    },
    {
      id: "P006",
      name: "Bonest Gatti 45mm BG4001-R2",
      brand: "Bonest Gatti",
      category: "xuhuong",
      price: 6448750,
      oldPrice: 18000000,
      image: "image/DONGHOXUHUONG/bg5606-a1-1-39375261-1339125135-1712669082-400x400.jpg",
      sku: "BG-BG4001",
      description: "Mặt lớn 45mm, phong cách thể thao-cổ điển.",
      specs: { size: "45mm", movement: "Quartz", waterResistance: "50m" }
    },
    {
      id: "P007",
      name: "Bonest Gatti 47mm BG5606-A1",
      brand: "Bonest Gatti",
      category: "xuhuong",
      price: 17900000,
      oldPrice: 20610000,
      image: "image/DONGHOXUHUONG/og358-477054415-1385737694-1712581494-400x400.jpg",
      sku: "BG-BG5606",
      description: "Thiết kế mạnh mẽ 47mm, bản giới hạn.",
      specs: { size: "47mm", movement: "Quartz", waterResistance: "100m" }
    },
    {
      id: "P008",
      name: "Hanboro 42mm HBR-996",
      brand: "Hanboro",
      category: "xuhuong",
      price: 4675000,
      oldPrice: 5500000,
      image: "image/DONGHOXUHUONG/hbr-996-1-1211435193-446273722-1712666735-400x400.jpg",
      sku: "HB-HBR996",
      description: "Đồng hồ đa chức năng, kiểu thể thao thanh lịch.",
      specs: { size: "42mm", movement: "Quartz", waterResistance: "50m" }
    },
    {
      id: "P009",
      name: "Movado 40mm 0607194",
      brand: "Movado",
      category: "xuhuong",
      price: 17900000,
      oldPrice: 20610000,
      image: "image/DONGHOXUHUONG/0607194-1712585777-400x400.jpg",
      sku: "MO-0607194",
      description: "Movado 40mm - thiết kế tối giản đặc trưng.",
      specs: { size: "40mm", movement: "Quartz", waterResistance: "30m" }
    },
    {
      id: "P010",
      name: "Seiko 42.5mm SRPD53K1",
      brand: "Seiko",
      category: "xuhuong",
      price: 1475000,
      oldPrice: 3500000,
      image: "image/DONGHOXUHUONG/re-av0005l00b-1712565902-400x400.jpg",
      sku: "SE-SRPD53",
      description: "Seiko 42.5mm, dòng phổ thông, bền bỉ.",
      specs: { size: "42.5mm", movement: "Automatic", waterResistance: "100m" }
    },
    {
      id: "P011",
      name: "Tissot 32mm T099.207.11.113.00",
      brand: "Tissot",
      category: "xuhuong",
      price: 11475000,
      oldPrice: 13500000,
      image: "image/DONGHOXUHUONG/28-1712662821-400x400.jpg",
      sku: "TI-T099207",
      description: "Tissot 32mm nữ, phù hợp phong cách công sở.",
      specs: { size: "32mm", movement: "Quartz", waterResistance: "50m" }
    },
    {
      id: "P012",
      name: "Olym Pianus 42mm OP990-45ADGS",
      brand: "Olym Pianus",
      category: "xuhuong",
      price: 11475000,
      oldPrice: 13500000,
      image: "image/DONGHOXUHUONG/fl-661303999-1468444074-1712574475-400x400.jpg",
      sku: "OP-OP990",
      description: "OP 42mm, thiết kế lộ máy một phần, phù hợp tặng quà.",
      specs: { size: "42mm", movement: "Automatic", waterResistance: "30m" }
    },
    {
      id: "P013",
      name: "Carnival 40mm 8108G-VT-X",
      brand: "Carnival",
      category: "xuhuong",
      price: 11475000,
      oldPrice: 13500000,
      image: "image/DONGHOXUHUONG/380-451dlw-1-1654585952376-1712585553-400x400.jpg",
      sku: "CV-8108G",
      description: "Carnival cổ điển, giá tốt, thiết kế sang trọng.",
      specs: { size: "40mm", movement: "Automatic", waterResistance: "30m" }
    },
    {
      id: "P014",
      name: "I&W Carnival 42mm 735G5",
      brand: "Carnival",
      category: "xuhuong",
      price: 11275000,
      oldPrice: 13500000,
      image: "image/DONGHOXUHUONG/8907g-vt-t-1-348948390-593092946-1712668541-400x400.jpg",
      sku: "CV-735G5",
      description: "Model 42mm, phù hợp nam công sở.",
      specs: { size: "42mm", movement: "Automatic", waterResistance: "50m" }
    },
    {
      id: "P015",
      name: "I&W Carnival 42mm 735G5 (alternate)",
      brand: "Carnival",
      category: "xuhuong",
      price: 10475000,
      oldPrice: 14500000,
      image: "image/DONGHOXUHUONG/ra-ar0007s10b-1-633473945-6512684-1712670699-400x400.jpg",
      sku: "CV-735G5-B",
      description: "Bản phối màu khác, giữ nguyên đặc tính kỹ thuật.",
      specs: { size: "42mm", movement: "Automatic", waterResistance: "50m" }
    },
  
    // NAM
    {
      id: "P016",
      name: "Casio 40mm Nam MTP-VT01L-1BUDF",
      brand: "Casio",
      category: "nam",
      price: 945600,
      oldPrice: 1506000,
      image: "image/DONGHONAM/CASIO/1-khung-sp-1295457203-1427251284-1712553992-400x400.jpg",
      sku: "CA-MTP-VT01L",
      description: "Casio MTP-VT01L 40mm, giá rẻ, phù hợp dùng hằng ngày.",
      specs: { size: "40mm", movement: "Quartz", waterResistance: "30m" }
    },
    {
      id: "P017",
      name: "Casio 40mm Nam MTP-V005D-2B5UDF",
      brand: "Casio",
      category: "nam",
      price: 768800,
      oldPrice: 961000,
      image: "image/DONGHONAM/CASIO/1-khung-sp-398023451-1303775603-1712567036-400x400.jpg",
      sku: "CA-MTP-V005D",
      description: "Mẫu phổ biến, dây kim loại, phong cách thanh lịch.",
      specs: { size: "40mm", movement: "Quartz", waterResistance: "30m" }
    },
    {
      id: "P018",
      name: "Casio 38.5mm Nam MTP-1183A-7ADF",
      brand: "Casio",
      category: "nam",
      price: 1000800,
      oldPrice: 1251000,
      image: "image/DONGHONAM/CASIO/mtp-1183a-7adf-61031483-1093893374-1712563673-400x400.jpg",
      sku: "CA-MTP-1183A",
      description: "Kích thước 38.5mm, thiết kế mỏng nhẹ.",
      specs: { size: "38.5mm", movement: "Quartz", waterResistance: "30m" }
    },
    {
      id: "P019",
      name: "Casio 41.5mm Nam MTP-V004L-1AUDF",
      brand: "Casio",
      category: "nam",
      price: 6776000,
      oldPrice: 8800000,
      image: "image/DONGHONAM/CASIO/mtp-v005d-2b5udf-1615935823-292418242-1712572700-400x400.jpg",
      sku: "CA-MTP-V004L",
      description: "Mẫu lịch lãm cho nam, mặt lớn 41.5mm.",
      specs: { size: "41.5mm", movement: "Quartz", waterResistance: "50m" }
    },
    {
      id: "P020",
      name: "Casio 38.2 × 35.2 mm Nam F-91W-1DG",
      brand: "Casio",
      category: "nam",
      price: 500000,
      oldPrice: 800000,
      image: "image/DONGHONAM/CASIO/aq-230a-7dmq-1157113970-680936365-1712565956-400x400.jpg",
      sku: "CA-F-91W",
      description: "F-91W classic, nhẹ, giá rẻ, pin lâu.",
      specs: { size: "38.2x35.2mm", movement: "Quartz", waterResistance: "30m" }
    },
    {
      id: "P021",
      name: "Bonest Gatti 47mm Nam BG5606-A1",
      brand: "Bonest Gatti",
      category: "nam",
      price: 6197500,
      oldPrice: 9250000,
      image: "image/DONGHONAM/TISSOT/l47052117-1-2061653098-399185788-1712575713-400x400.jpg",
      sku: "BG-BG5606-N",
      description: "Bản nam 47mm, mặt lớn nổi bật.",
      specs: { size: "47mm", movement: "Quartz", waterResistance: "50m" }
    },
    {
      id: "P022",
      name: "Tissot 40mm Nam T137.407.11.041.00",
      brand: "Tissot",
      category: "nam",
      price: 17900000,
      oldPrice: 20610000,
      image: "image/DONGHONAM/TISSOT/t006-2133685469-2118898420-1712571970-400x400.jpg",
      sku: "TI-T137407",
      description: "Tissot lịch lãm 40mm, phù hợp doanh nhân.",
      specs: { size: "40mm", movement: "Automatic", waterResistance: "50m" }
    },
    {
      id: "P023",
      name: "Tissot 40mm Nam T137.407.16.041.00",
      brand: "Tissot",
      category: "nam",
      price: 17900000,
      oldPrice: 20610000,
      image: "image/DONGHONAM/TISSOT/t137-407-16-041-00-1-1664596612185-1712585522-400x400.jpg",
      sku: "TI-T137407B",
      description: "Phiên bản khác màu, cấu hình tương tự.",
      specs: { size: "40mm", movement: "Automatic", waterResistance: "50m" }
    },
    {
      id: "P024",
      name: "Tissot 35mm Unisex T137.207.11.351.00",
      brand: "Tissot",
      category: "nam",
      price: 17900000,
      oldPrice: 20610000,
      image: "image/DONGHONAM/TISSOT/t035-500423103-1639501352-1712572400-400x400.jpg",
      sku: "TI-T137207",
      description: "Dòng unisex 35mm, thiết kế cổ điển hiện đại.",
      specs: { size: "35mm", movement: "Quartz", waterResistance: "50m" }
    },
    {
      id: "P025",
      name: "Tissot 39.3mm Nam T006.407.36.263.00",
      brand: "Tissot",
      category: "nam",
      price: 17100000,
      oldPrice: 20710000,
      image: "image/DONGHONAM/TISSOT/t137-679443174-610497435-1712585231-400x400.jpg",
      sku: "TI-T006407",
      description: "Tissot classic 39.3mm, hoàn thiện cao cấp.",
      specs: { size: "39.3mm", movement: "Automatic", waterResistance: "50m" }
    },
    {
      id: "P026",
      name: "Casio 51mm Nam GA-140AR-1ADR (G-SHOCK)",
      brand: "Casio",
      category: "nam",
      price: 3111200,
      oldPrice: 3880000,
      image: "image/DONGHONAM/G-SHOCK/ga-100b-4adr-1_casiogshock_1716173817-400x400.jpg",
      sku: "CA-GA-140AR",
      description: "G-Shock mạnh mẽ 51mm, chống sốc & đa chức năng.",
      specs: { size: "51mm", movement: "Quartz", waterResistance: "200m" }
    },
    {
      id: "P027",
      name: "Casio 51mm Nam GA-100RS-2ADR",
      brand: "Casio",
      category: "nam",
      price: 3000800,
      oldPrice: 3610000,
      image: "image/DONGHONAM/G-SHOCK/ga-100rs-2adr_19fd6afe0ede4bffb638bbce4181063b_3885f19f981145bcae503ba734300f1d_optimized-1650618808238-1712583433-400x400.jpg",
      sku: "CA-GA-100RS",
      description: "G-Shock thể thao, pin lâu, bền bỉ.",
      specs: { size: "51mm", movement: "Quartz", waterResistance: "200m" }
    },
    {
      id: "P028",
      name: "Casio 50mm Nam DW-6900JT-3DR",
      brand: "Casio",
      category: "nam",
      price: 2980800,
      oldPrice: 3726000,
      image: "image/DONGHONAM/G-SHOCK/ga-110c-1adr-1-1639902506797-1712578544-400x400.jpg",
      sku: "CA-DW-6900JT",
      description: "DW-6900 series, thiết kế bền bỉ cho hoạt động ngoài trời.",
      specs: { size: "50mm", movement: "Quartz", waterResistance: "200m" }
    },
    {
      id: "P029",
      name: "Casio Nam MTG-B2000XMG-1ADR",
      brand: "Casio",
      category: "nam",
      price: 35200000,
      oldPrice: 44610000,
      image: "image/DONGHONAM/G-SHOCK/ga-140ar-1adr-1-1639930127857-1712578565-400x400.jpg",
      sku: "CA-MTG-B2000",
      description: "MTG series cao cấp, vật liệu cao cấp, nhiều tính năng.",
      specs: { size: "46mm", movement: "Hybrid", waterResistance: "200m" }
    },
    {
      id: "P030",
      name: "Casio 53.4mm Nam GA-735E-7ADR",
      brand: "Casio",
      category: "nam",
      price: 3944800,
      oldPrice: 4500000,
      image: "image/DONGHONAM/G-SHOCK/ga-735e-7adr-1-1640012014903-1712578658-400x400.jpg",
      sku: "CA-GA-735E",
      description: "Model lớn 53.4mm, phong cách hầm hố.",
      specs: { size: "53.4mm", movement: "Quartz", waterResistance: "200m" }
    },
  
    // NỮ
    {
      id: "P031",
      name: "Casio 28.4mm Nữ LTP-V005L-7BUDF",
      brand: "Casio",
      category: "nu",
      price: 580800,
      oldPrice: 726000,
      image: "image/DONGHONU/CASIO/ltp-v001gl-9budf-824457728-1701744936-1712554881-400x400.jpg",
      sku: "CA-LTP-V005L",
      description: "Đồng hồ nữ 28.4mm, kiểu tinh tế cho phái đẹp.",
      specs: { size: "28.4mm", movement: "Quartz", waterResistance: "30m" }
    },
    {
      id: "P032",
      name: "Casio 25mm Nữ LTP-V001GL-9BUDF",
      brand: "Casio",
      category: "nu",
      price: 677600,
      oldPrice: 847000,
      image: "image/DONGHONU/CASIO/ltp-v001l-1budf-1712566842-400x400.jpg",
      sku: "CA-LTP-V001GL",
      description: "Mẫu nhỏ xinh 25mm, phù hợp cổ tay nhỏ.",
      specs: { size: "25mm", movement: "Quartz", waterResistance: "30m" }
    },
    {
      id: "P033",
      name: "Casio 25mm Nữ LTP-V006L-4BUDF",
      brand: "Casio",
      category: "nu",
      price: 684800,
      oldPrice: 856000,
      image: "image/DONGHONU/CASIO/ltp-v005l-7budf-463612440-806370569-1712554979-400x400.jpg",
      sku: "CA-LTP-V006L",
      description: "Thiết kế nữ tính, dây da mảnh.",
      specs: { size: "25mm", movement: "Quartz", waterResistance: "30m" }
    },
    {
      id: "P034",
      name: "Casio 41.5mm Nữ GA-2100MNG-7ADR",
      brand: "Casio",
      category: "nu",
      price: 2944800,
      oldPrice: 4500000,
      image: "image/DONGHONU/G-SHOCK/untitled-1-40803878-1686844001-1712664112-400x400.jpg",
      sku: "CA-GA-2100MNG",
      description: "G-Shock phiên bản nữ, kiểu dáng cá tính.",
      specs: { size: "41.5mm", movement: "Quartz", waterResistance: "200m" }
    },
    {
      id: "P035",
      name: "Casio 25mm Nữ LTP-V006L-4BUDF (alt)",
      brand: "Casio",
      category: "nu",
      price: 500000,
      oldPrice: 800000,
      image: "image/DONGHONU/CASIO/ltp-v006l-4budf-1-1210488598-1537295250-1712555034-400x400.jpg",
      sku: "CA-LTP-V006L-B",
      description: "Phiên bản khác màu, kích thước nhỏ gọn.",
      specs: { size: "25mm", movement: "Quartz", waterResistance: "30m" }
    },
    {
      id: "P036",
      name: "Tissot 29mm Nữ T085.210.36.013.00",
      brand: "Tissot",
      category: "nu",
      price: 5550000,
      oldPrice: 9500000,
      image: "image/DONGHONU/TISSOT/t063-009-16-018-00-1-1654503342485-1712576998-400x400.jpg",
      sku: "TI-T085210",
      description: "Tissot 29mm, tinh tế, phù hợp thời trang công sở.",
      specs: { size: "29mm", movement: "Quartz", waterResistance: "50m" }
    },
    {
      id: "P037",
      name: "Tissot 25mm Nữ T063.009.16.018.00",
      brand: "Tissot",
      category: "nu",
      price: 5590000,
      oldPrice: 9790000,
      image: "image/DONGHONU/TISSOT/t085-1824755438-71512346-1712573413-400x400.jpg",
      sku: "TI-T063009",
      description: "Mẫu nữ Tissot nhỏ nhắn, thanh lịch.",
      specs: { size: "25mm", movement: "Quartz", waterResistance: "30m" }
    },
    {
      id: "P038",
      name: "Tissot 24.4x27.2mm Nữ T103.110.17.053.00",
      brand: "Tissot",
      category: "nu",
      price: 3990000,
      oldPrice: 6200000,
      image: "image/DONGHONU/TISSOT/t085-210-36-013-00-2-1680058242594-1712571568-400x400.jpg",
      sku: "TI-T103110",
      description: "Thiết kế mặt vuông nhỏ nữ tính.",
      specs: { size: "24.4x27.2mm", movement: "Quartz", waterResistance: "30m" }
    },
    {
      id: "P039",
      name: "Tissot 28.5mm Nữ T085.210.22.013.00",
      brand: "Tissot",
      category: "nu",
      price: 5500000,
      oldPrice: 8550000,
      image: "image/DONGHONU/TISSOT/t103-656493960-1751704942-1712572240-400x400.jpg",
      sku: "TI-T085210B",
      description: "Phiên bản 28.5mm, sang trọng & thanh lịch.",
      specs: { size: "28.5mm", movement: "Quartz", waterResistance: "50m" }
    },
    {
      id: "P040",
      name: "Tissot 33mm Nữ T035.246.16.111.00",
      brand: "Tissot",
      category: "nu",
      price: 5600000,
      oldPrice: 9710000,
      image: "image/DONGHONU/TISSOT/t035-395967672-348891399-1712573390-400x400.jpg",
      sku: "TI-T035246",
      description: "Model 33mm, phù hợp nhiều dáng tay.",
      specs: { size: "33mm", movement: "Quartz", waterResistance: "30m" }
    },
    {
      id: "P041",
      name: "Casio 50mm Nữ DW-6900LU-3DR",
      brand: "Casio",
      category: "nu",
      price: 4944800,
      oldPrice: 5500000,
      image: "image/DONGHONU/G-SHOCK/mtg-g1000rb-1adr-1641825275696-1712579930-400x400.jpg",
      sku: "CA-DW-6900LU",
      description: "DW-6900 phiên bản nữ, bền, phong cách hiện đại.",
      specs: { size: "50mm", movement: "Quartz", waterResistance: "200m" }
    },
    {
      id: "P042",
      name: "Casio 49mm Nữ GST-B200TJ-1ADR",
      brand: "Casio",
      category: "nu",
      price: 7944800,
      oldPrice: 14500000,
      image: "image/DONGHONU/G-SHOCK/mtg-b2000xmg-1adr-1712586638-400x400.jpg",
      sku: "CA-GST-B200",
      description: "Series GST, kiểu dáng thời trang mạnh mẽ cho nữ.",
      specs: { size: "49mm", movement: "Quartz", waterResistance: "200m" }
    },
    {
      id: "P043",
      name: "Casio 45.9mm Nữ GMA-S120NP-4ADR",
      brand: "Casio",
      category: "nu",
      price: 3944800,
      oldPrice: 4500000,
      image: "image/DONGHONU/G-SHOCK/gma-s110mp-4a2dr-1-1640270419320-1712579019-400x400.jpg",
      sku: "CA-GMA-S120",
      description: "Dòng GMA-S nhỏ gọn, phù hợp nữ thích sport.",
      specs: { size: "45.9mm", movement: "Quartz", waterResistance: "100m" }
    },
    {
      id: "P044",
      name: "Casio 46mm Nữ GMA-S110MP-4A2DR",
      brand: "Casio",
      category: "nu",
      price: 13944800,
      oldPrice: 15500000,
      image: "image/DONGHONU/G-SHOCK/gma-s120np-4adr-1712577862-400x400.jpg",
      sku: "CA-GMA-S110",
      description: "Model nữ kích thước lớn, cá tính.",
      specs: { size: "46mm", movement: "Quartz", waterResistance: "100m" }
    },
  
    // HOTSALE / SPMỚI
    {
      id: "P045",
      name: "Casio 45x42.1mm Nam AE-1200WHD-1A",
      brand: "Casio",
      category: "hot",
      price: 1204800,
      oldPrice: 1506000,
      image: "image/SPHOTSALE/1-khung-sp-1-1818542633-1853976209-1712563883-400x400.jpg",
      sku: "CA-AE-1200WHD",
      description: "Model AE-1200WHD, thiết kế quân đội, nhiều múi giờ.",
      specs: { size: "45x42.1mm", movement: "Quartz", waterResistance: "100m" }
    },
    {
      id: "P046",
      name: "Casio MTP-1374L-1A",
      brand: "Casio",
      category: "hot",
      price: 1816000,
      oldPrice: 2270000,
      image: "image/SPHOTSALE/1-khung-sp-6676612-1785849039-1712554705-400x400.jpg",
      sku: "CA-MTP-1374L",
      description: "Dòng MTP phổ thông, dây da & kim loại lựa chọn.",
      specs: { size: "40mm", movement: "Quartz", waterResistance: "30m" }
    },
    {
      id: "P047",
      name: "Orient 42mm Nam RA-AA0B02R39B",
      brand: "Orient",
      category: "hot",
      price: 6880000,
      oldPrice: 8600000,
      image: "image/SPHOTSALE/op990-45adgs-gl-d-1-1655171724651-1712585288-400x400.jpg",
      sku: "OR-RA-AA0B02R",
      description: "Orient RA series, cơ khí, hoàn thiện tốt trong tầm giá.",
      specs: { size: "42mm", movement: "Automatic", waterResistance: "50m" }
    },
    {
      id: "P048",
      name: "Olym Pianus 42mm Nam OP990-45ADGS (Hot)",
      brand: "Olym Pianus",
      category: "hot",
      price: 6776000,
      oldPrice: 8800000,
      image: "image/SPHOTSALE/ra-aa0b02r19b-2081811590-287106387-1712554040-400x400.jpg",
      sku: "OP-OP990-HOT",
      description: "OP nổi tiếng ở phân khúc tầm trung, mặt lộ cơ tinh tế.",
      specs: { size: "42mm", movement: "Automatic", waterResistance: "30m" }
    },
  
    // Thêm 2 sản phẩm lấp đầy danh sách thành 50
    {
      id: "P049",
      name: "Seiko Presage 40mm (Sample)",
      brand: "Seiko",
      category: "nam",
      price: 8250000,
      oldPrice: 9500000,
      image: "image/DONGHOXUHUONG/snk807k2-1712554669-400x400.jpg",
      sku: "SE-PRESAGE-40",
      description: "Dòng Presage, hoàn thiện mặt số đẹp, dành cho người thích cơ khí.",
      specs: { size: "40mm", movement: "Automatic", waterResistance: "50m" }
    },
    {
      id: "P050",
      name: "Classic Leather Strap 38mm (Sample)",
      brand: "Generic",
      category: "nu",
      price: 420000,
      oldPrice: 600000,
      image: "image/DONGHONU/CASIO/ltp-v001gl-9budf-824457728-1701744936-1712554881-400x400.jpg",
      sku: "GN-CLS-38",
      description: "Dây da & case mỏng 38mm - mẫu giá rẻ cho khách hàng trẻ.",
      specs: { size: "38mm", movement: "Quartz", waterResistance: "30m" }
    }
  ];
  
  // Expose globally
  window.PRODUCTS = PRODUCTS;
  /**
   * 
   * @returns 
   */
  function getCurrentProduct(){
    //lấy chuỗi product được lưu trữ trong localstorage
    const storedProduct = localStorage.getItem("products");
    if(storedProduct)
    {
      try{
        //chuyển chuỗi localStorage thành mảng jvs
        const parsed_products=JSON.parse(storedProduct)
        
        //kiểm tra tính hợp lệ của mảng
        if(Array.isArray(parsed_products)&&parsed_products.length>0)
        {
          return parsed_products;
        }
      }
      catch (e)
      {
        console.error("lỗi parse localStorage 'product':", e)
      }
    }
    return PRODUCTS;
  }
  
  // Helper functions (tuỳ ý sử dụng)

  //cập nhật hàm sao cho luôn lấy dữ liệu mới nhật được thêm vào
  window.getProducts = function (filters = {}) {  
    let currentProducts=getCurrentProduct();

    // filters có thể gồm: { category, brand, priceMin, priceMax, query }
    let result = currentProducts.filter(p => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.brand && p.brand && p.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
      if (filters.priceMin && p.price < filters.priceMin) return false;
      if (filters.priceMax && p.price > filters.priceMax) return false;
  
      // Xử lý tìm kiếm theo từ khóa (query)
      if (filters.query && filters.query.trim() !== "") {
        const q = filters.query.toLowerCase().trim();
  
        // Gộp các trường có thể tìm được: name, brand, description
        const text = [
          p.name,
          p.brand || "",
          p.description || "",
          p.id || "",
          p.sku || ""
        ]
          .join(" ")
          .toLowerCase();
  
        // Nếu không có từ khóa trong các trường này → loại bỏ
        if (!text.includes(q)) return false;
      }
  
      return true;
    });
  
    return result;
  };
  
  window.getProductById = function (id) {
    const products = getCurrentProduct(); // luôn lấy dữ liệu mới nhất
    return products.find(p => p.id === id) || null;
};

  // Lấy danh mục từ localStorage (được thêm từ admin)
  // Nếu chưa có, trả về danh mục mặc định
  window.getCategories = function () {
    let categories = JSON.parse(localStorage.getItem("categories"));
    
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      // Danh mục mặc định
      categories = [
        { name: "xuhuong", hidden: false },
        { name: "nam", hidden: false },
        { name: "nu", hidden: false },
        { name: "hot", hidden: false }
      ];
      localStorage.setItem("categories", JSON.stringify(categories));
    }
    
    // Chỉ trả về danh mục không ẩn
    return categories.filter(c => !c.hidden);
  };
  