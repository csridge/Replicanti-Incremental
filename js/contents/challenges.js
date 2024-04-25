const CHALS = {
    types: ['normal','inf'],
    sumTotal() {
        let total = {}
        for (let x in this.types) {
            let total2 = 0
            for (let y = 1; y <= this[this.types[x]].length; y++) {
                if (player.stats.chals_best[this.types[x]+y] === undefined) {
                    total2 = 1e9
                    break
                }
                total2 += player.stats.chals_best[this.types[x]+y]
            }
            total[this.types[x]] = total2
        }
        return total
    },
    onChal(x) { return player.chals.active == x },
    enter(ch, id) {
        if (player.chals.active == "") {
            player.chals.active = ch + id
            this[ch].onEnter()
        }
    },
    exit() {
        if (player.chals.active != "") {
            let ch = ""
            for (let x = 0; x < this.types.length; x++) {
                if (player.chals.active.includes(this.types[x])) {
                    ch = this.types[x]
                    break
                }
            }
            this[ch].onEnter()
            player.chals.active = ""
        }
    },
    normal: {
        btnMsg(x) { return player.chals.active == "normal"+x ? "Đang làm" : (player.chals.comps.includes("normal"+x) ? "Đã hoàn thành" : "Bắt đầu") },
        onEnter() {
            FORMS.inf.onReset(true)
        },
        length: 6,
        1: {
            unl() { return true },
            desc: "Hình phạt Nhân bản mạnh hơn 50%",
            reward: "Mở khóa Tự động mua Kho Nhân bản",
        },
        2: {
            unl() { return true },
            desc: "Bạn không được mua Hệ số nhân Nhân bản, và sản lượng Nhân bản bắt đầu ở 2x",
            reward: "Mở khóa Tự động mua Hệ số nhân Nhân bản",
        },
        3: {
            unl() { return true },
            desc: "Hệ số nhân Nhân bản/Sức mạnh Nhân bản có quy mô giá lớn hơn",
            reward: "Mở khóa Tự động mua Sức mạnh Nhân bản",
        },
        4: {
            unl() { return true },
            desc: "Lặp lại Nhân bản tăng Hệ số nhân Nhân bản/Sức mạnh thay vì Kho Nhân bản, nhưng Lặp lại Nhân bản mạnh hơn 4x",
            reward: "Mở khóa Tự động mua Lặp lại Nhân bản",
        },
        5: {
            unl() { return true },
            desc: "Ngân hà Nhân bản có quy mô giá lớn hơn",
            reward: "Mở khóa Tự động mua Ngân hà Nhân bản",
        },
        6: {
            unl() { return true },
            desc: "Điểm uy tín nhân được bị mũ 0,85",
            reward: "Bạn nhận được 100% số điểm Uy tín đạt được khi khởi động lại mỗi giây",
        },
    },
    inf: {
        requires: [E('e1100'), E('e1350'), E('e2350'), E('e3800'), E('e10200'), E('e11300')],
        canComplete() { return player.replicanti.gte(this[player.chals.active.split("inf")[1]].goal) },
        canUnlock() { return player.replicanti.gte(this.requires[player.chals.inf_unls]) },
        unlock() { if (this.canUnlock()) player.chals.inf_unls++ },
        btnMsg(x) { return player.chals.active == "inf"+x ? "Đang chạy" : (player.chals.comps.includes("inf"+x) ? "Đã hoàn thành" : "Bắt đầu") },
        onEnter() {
            FORMS.inf.onReset(true)
        },
        length: 6,
        1: {
            goal: E('e480'),
            desc: "Tất cả các thử thách trước đó cùng một lúc",
            reward: "Tất cả các thử thách đã hoàn thành đều thúc đẩy sản lượng của Nhân bản Vô hạn",
        },
        2: {
            goal: E('e500'),
            desc: "Ngân hà Nhân bản bị tắt, nhưng bạn có thể Hy sinh Nhân bản",
            reward: "Mở khóa Hy sinh Nhân bản",
        },
        3: {
            goal: E('e640'),
            desc: "Hình phạt, Làm chậm Nhân bản mạnh gấp đôi",
            reward: "Hình phạt Nhân bản yếu hơn 25%r",
        },
        4: {
            goal: E('e2300'),
            desc: "Hiệu ứng từ Nhân bản Vô hạn bị tắt",
            reward: "Số điểm Vô hạn nhận được nhân đôi cho mỗi thử thách hoàn thành, mở khóa Tự động Hy sinh Nhân bản",
        },
        5: {
            goal: E('e4400'),
            desc: "Hy sinh Nhân bản bị tắt",
            reward: "Giới hạn mềm số điểm Vô hạn nhận được yếu hơn 50%",
        },
        6: {
            goal: E('e1400'),
            desc: "Bạn không được mua các Nâng cấp Uy tín trừ hàng 1 và hàng 2",
            reward: "Giới hạn mềm số điểm Uy tín nhận được yếu đi một chút",
        },
    },
}
