const ACHS = {
    unl(id) {
        if (!player.achs.includes(id)) {
            player.achs.push(id)
            $.notify(this.names[id], 'success')
        }
    },
    has(id) { return player.achs.includes(id) },
    getText(id) {
        let txt = this.descs[id]+(this.rewards[id] !== undefined ? " Phần thưởng: "+this.rewards[id] : "")
        if (txt.indexOf("format") != -1) {
			let txt2 = txt.split("format")[1];
			return txt.split("format")[0] + format(txt2.slice(1, txt2.indexOf(")"))) + txt2.split(")")[1];
		}
        return txt
    },
    checkACHS() {
        for (let r = 1; r <= this.rows; r++) for (let c = 1; c <= this.cols; c++) if (this.checks[r*10+c] !== undefined ? this.checks[r*10+c]() : false) this.unl(r*10+c)
    },
    cols: 8,
    rows: 5,

    names: {
        0: "Placeholder",

        11: "Bắt đầu",
        12: "Mày không vừa với Vô hạn",
        13: "Đã được Ngân hà nhanh hơn chưa?",
        14: "Hai Ngân hà",
        15: "Lạm phát",
        16: "Khi hy sinh Ngân hà",
        17: "Thiên hà được buff",
        18: "Nửa chặng đường đến Vô hạn",

        21: "TRANG VÔ HẠN",
        22: "Sao tao lại thêm giới hạn?",
        23: "Tốn nhiều hơn",
        24: "Hy sinh mà không có ngân hà?",
        25: "Rock thực ra chẳng thông minh",
        26: "Vô hạn kiểu brrr",
        27: "Try Hard",
        28: "Uy tín bị giới hạn?!",

        31: "TUYỆT",
        32: "HA KIỂU BRRR",
        33: "Phản Ngân hà",
        34: "Người thử thách tiếp theo",
        35: "Lại là bức tường thời gian?",
        36: "Thằng béo thử thách",
        37: "Họ hiểu về hạnh phúc chưa?",
        38: "Nhân bản^2",

        41: "Bậc thầy thử thách",
        42: "Siu uy tín",
        43: "Cuộc đời nhanh nhất trong cuộc đời",
        44: "Hy sinh Chiều không gian",
        45: "Nghe về âm thanh của AD?",
        46: "Chúa Sad",
        47: "No lạm phát",
        48: "Yes Lạm phát",

        51: "ngon",
        52: "EXE.exe đã dừng hoạt động",
        54: "Nhân bản Cứng",
    },
    descs: {
        0: "Placeholder.",

        11: "Mua Hệ Số Nhân Nhaan bản.",
        12: "Có format(1e6) nhân bản.",
        13: "Có Ngân hà Nhân bản.",
        14: "Có 2 Ngân hà Nhân bản.",
        15: "Có sản lượng Nhân bản ít nhất format(1e10)x.",
        16: "Uy tín.",
        17: "Có 10 Ngân hà Nhân bản.",
        18: "Có ít nhất format(1.3407807929942597e154) Nhân bản.",

        21: "Đi Vô hạn.",
        22: "Có Máy nén Vô hạn.",
        23: "Có ít nhất 5 Máy nén Vô hạn.",
        24: "Uy tín mà không cần Ngân hà Nhân bản.",
        25: "Hoàn thành bất kỳ Thử thách nào.",
        26: "Vô hạn trong vòng dưới 10 phút.",
        27: "Hoàn thành tất cả thử thách.",
        28: "Cos format(1e20) điểm Uy tín mà không cần phá vỡ Vô hạn.",

        31: "Có format(6.9e420) Nhân bản.",
        32: "Vô hạn trong dưới 10 giây.",
        33: "Vô hạn mà không cần Ngân hà Nhân bản.",
        34: "Mở khoá Thử thách Vô hạn.",
        35: "Hoàn thành bất kỳ Thử thách Vô hạn nào.",
        36: "Hoàn thành tất cả thử thách trong dưới 1 phút.",
        37: "Có ^format(1000) Hy sinh Nhân bản.",
        38: "Có  format(9.9999e999) Nhân bản.",

        41: "Hoàn thành tất cả Thử thách Vô hạn.",
        42: "Có format(1.798e308) điểm Uy tín.",
        43: "Vô hạn trong dưới 1 giây.",
        44: "Hoàn thành Thử thách Vô hạn số 2 mà không cần hy sinh Nhân bản.",
        45: "Mua Máy Nhân bản Cấp 1.",
        46: "Có ít nhất format(e2000) Nhân bản mà không cần Ngân hà Nhân bản hay Hy sinh.",
        47: "Có format(ee4) Nhân bản.",
        48: "Có format(ee6) Máy nhân bản.",

        51: "Mua Máy Nhân bản cấp 4.",
        52: "Có ít nhất format(e4200) Nhân bản mà không có Ngân hà Nhân bản hay Hy sinh trong khi ở trong Thử thách Vô hạn số 1.",
        54: "Reach at least format(ee4) Infinity Replicanti.",
    },
    rewards: {
        21: "Start with format(1e5) Replicanti.",
        22: "Replicanti Galaxy is 50% stronger.",
        24: "Replicanti Galaxy is 25% stronger.",
        26: "Start with format(1e10) Replicanti.",
        27: "Double Infinity points gain.",

        32: "Start with format(1e50) Replicanti.",
        34: "Replicanti Upgrades no longer spent Replicanti.",
        37: "Replicanti Sacrifice no longer resets Replicanti.",
        38: "Replicanti Growth is stronger based on Replicanti at a reduced rate.",

        43: "Start with format(1e100) Replicanti.",
        47: "Why are you wanted to see Inflation? nope...",
        48: "Unlock Infinity Compressor Autobuyer.",

        52: "Replicanti Galaxy & Sacrifice are 50% stronger.",
        54: "Infinity Replicanti growth is 50% stronger.",
    },
    checks: {
        11() { return player.rep_upgs[2].gte(1) },
        12() { return player.replicanti.gte(1e6) },
        13() { return player.rep_galaxy.gte(1) },
        14() { return player.rep_galaxy.gte(2) },
        15() { return player.stats.fast_grow.gte(1e10) },
        17() { return player.rep_galaxy.gte(10) },
        18() { return player.replicanti.gte(2**512) },

        22() { return player.inf.comp.gte(1) },
        23() { return player.inf.comp.gte(5) },
        26() { return player.inf.best < 600 },
        27() { return player.chals.comps.includes("normal1") 
        && player.chals.comps.includes("normal2") 
        && player.chals.comps.includes("normal3") 
        && player.chals.comps.includes("normal4") 
        && player.chals.comps.includes("normal5") 
        && player.chals.comps.includes("normal6") },
        28() { return player.prestige.points.gte(1e20) },

        31() { return player.replicanti.gte("6.9e420") },
        32() { return player.inf.best < 10 },
        34() { return player.chals.inf_unls > 0 },
        36() { return CHALS.sumTotal().normal <= 60 },
        37() { return player.rep_sacrifice.gte(1e3) },
        38() { return player.replicanti.gte("9.9999e999") },

        41() { return player.chals.comps.includes("inf1") 
        && player.chals.comps.includes("inf2") 
        && player.chals.comps.includes("inf3") 
        && player.chals.comps.includes("inf4") 
        && player.chals.comps.includes("inf5") 
        && player.chals.comps.includes("inf6") },
        42() { return player.prestige.points.gte(FORMS.INF) },
        43() { return player.inf.best < 1 },
        45() { return player.replicator.gens[1].bought.gte(1) },
        46() { return player.replicanti.gte('e2000') && player.rep_galaxy.lte(0) && player.rep_sacrifice.lte(1) },
        47() { return player.replicanti.gte("ee4") },
        48() { return player.replicator.amount.gte("ee6") },

        51() { return player.replicator.gens[4].bought.gte(1) },
        52() { return player.replicanti.gte('e4200') && player.rep_galaxy.lte(0) && player.rep_sacrifice.lte(1) && CHALS.onChal('inf1') },
        54() { return player.inf.replicanti.gte('ee4') },
    }
}
