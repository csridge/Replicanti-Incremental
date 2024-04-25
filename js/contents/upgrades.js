const UPGS = {
    replicanti: {
        cols: 4,
        can(x) { return player.replicanti.gte(this[x].cost()) && (x == 2 ? !(CHALS.onChal("normal2") || CHALS.onChal("inf1")) : true) },
        buy(x) {
            if (this.can(x)) {
                if (!ACHS.has(34)) player.replicanti = player.replicanti.sub(this[x].cost()).max(1)
                player.rep_upgs[x] = player.rep_upgs[x].add(1)
            }
        },
        buyMax() {
            for (let x = 1; x <= this.cols; x++) this.max(x)
        },
        max(x) {
            if (this.can(x)) {
                let bulk = this[x].bulk()
                if (bulk.gt(player.rep_upgs[x])) {
                    if (!ACHS.has(34)) player.replicanti = player.replicanti.sub(this[x].cost(bulk.sub(1))).max(1)
                    player.rep_upgs[x] = bulk
                }
            }
        },
        1: {
            id: 1,
            title: "Kho Nhân bản",
            cost(x=player.rep_upgs[this.id]) { return E(2).pow(x.pow(1.5)).mul(10) },
            effect(x=player.rep_upgs[this.id]) {
                let ret = E(2).mul(FORMS.replicanti.galaxy.effect()).mul(FORMS.inf.replicanti.effect()).softcap(10,1/2,0).mul(CHALS.onChal("normal4") || CHALS.onChal("inf1") ? 1 : UPGS.replicanti[4].effect()).pow(x)
                return ret
            },
            desc(eff=this.effect()) { return `Làm cho Hình phạt Nhân bản bắt đầu ${format(eff)}x muộn hơn.` },
            bulk(x=player.replicanti) {
                if (x.div(10).lt(1)) return E(0)
                let bulk = x.div(10).logBase(2).root(1.5).add(1).floor()
                return bulk
            },
        },
        2: {
            id: 2,
            title: "Hệ số nhân Nhân bản",
            cost(x=player.rep_upgs[this.id]) { return E(10).pow(x.pow(1.5).pow(CHALS.onChal("normal3") || CHALS.onChal("inf1")?2:1)) },
            effect(x=player.rep_upgs[this.id]) {
                let lvl = x.mul(FORMS.replicanti.galaxy.effect()).mul(FORMS.inf.replicanti.effect()).mul(CHALS.onChal("normal4") || CHALS.onChal("inf1") ? UPGS.replicanti[4].effect() : 1)
                if (player.prestige.upgrades.includes(11)) lvl = lvl.mul(2)
                if (player.prestige.upgrades.includes(12)) lvl = lvl.pow(UPGS.prestige[12].effect())
                return lvl.div(5).add(1)
            },
            desc(eff=this.effect()) { return `Nhân hệ số nhân của Nhân bản lên ${format(eff)}x.` },
            bulk(x=player.replicanti) {
                let bulk = x.logBase(10).root(1.5).root(CHALS.onChal("normal3") || CHALS.onChal("inf1")?2:1).add(1).floor()
                return bulk
            },
        },
        3: {
            id: 3,
            title: "Sức mạnh Nhân bản",
            cost(x=player.rep_upgs[this.id]) { return E(10).pow(x.pow(2).pow(CHALS.onChal("normal3") || CHALS.onChal("inf1")?2:1)).mul(1000) },
            effect(x=player.rep_upgs[this.id]) {
                let lvl = x.mul(FORMS.inf.replicanti.effect()).mul(CHALS.onChal("normal4") || CHALS.onChal("inf1") ? UPGS.replicanti[4].effect() : 1)
                if (player.prestige.upgrades.includes(12)) lvl = lvl.pow(UPGS.prestige[12].effect())
                return lvl.div(5).mul(FORMS.replicanti.galaxy.effect()).add(1).softcap(100,1/3,0).softcap(1000,1/3,0)
            },
            desc(eff=this.effect()) { return `Sản lượng nhân bản được ^${format(eff)}.` },
            bulk(x=player.replicanti) {
                if (x.div(1000).lt(1)) return E(0)
                let bulk = x.div(1000).logBase(10).root(2).root(CHALS.onChal("normal3") || CHALS.onChal("inf1")?2:1).add(1).floor()
                return bulk
            },
        },
        4: {
            id: 4,
            title: "Lặp lại Nhân bản",
            cost(x=player.rep_upgs[this.id]) { return E(10).pow(x.pow(2)).mul(1e16) },
            effect(x=player.rep_upgs[this.id]) {
                let ret = player.replicanti.log10().mul(x).mul(FORMS.replicanti.galaxy.effect()).mul(FORMS.inf.replicanti.effect()).add(1).root(10)
                if (player.prestige.upgrades.includes(22)) ret = ret.pow(2)
                if (CHALS.onChal("normal4") || CHALS.onChal("inf1")) ret = ret.pow(4)
                return ret
            },
            desc(eff=this.effect()) { return `Làm cho Kho Nhân bản mạnh hơn ${format(eff)}x lần dựa theo số lượng Nhân bản.` },
            bulk(x=player.replicanti) {
                if (x.div(1e16).lt(1)) return E(0)
                let bulk = x.div(1e16).logBase(10).root(2).add(1).floor()
                return bulk
            },
        },
    },
    prestige: {
        cols: 4,
        rows: 4,
        can(x) { return player.prestige.points.gte(this[x].cost) && !player.prestige.upgrades.includes(x)
        && (CHALS.onChal("inf6") ? x <= 24 : true) },
        buy(x) {
            if (this.can(x)) {
                player.prestige.points = player.prestige.points.sub(this[x].cost)
                player.prestige.upgrades.push(x)
            }
        },
        11: {
            unl() { return true },
            desc: "Hệ số nhân Nhân bản hiệu quả gấp 2 lần.",
            cost: E(1),
        },
        12: {
            unl() { return true },
            desc: "Hệ số nhân Nhân bản/Nhân bản Sức mạnh mạnh hơn dựa trên số điểm Uy tín chưa được sử dụng.",
            cost: E(3),
            effect() {
                let ret = player.prestige.points.add(1).log10().add(1).root(2)
                return ret
            },
            effDesc(eff=this.effect()) { return "^"+format(eff) },
        },
        13: {
            unl() { return true },
            desc: "Hình phạt Nhân bản yếu hơn 25%.",
            cost: E(10),
        },
        14: {
            unl() { return true },
            desc: "Ngân hà Nhân bản không khởi động lại cái gì nữa.",
            cost: E(25),
        },
        21: {
            unl() { return true },
            desc: "Làm chậm Nhân bản bắt đầu muộn hơn dựa trên số điểm Uy tín chưa được sử dụng.",
            cost: E(100),
            effect() {
                let ret = player.prestige.points.add(1).pow(2)
                if (player.prestige.upgrades.includes(24)) ret = ret.pow(UPGS.prestige[24].effect())
                return ret.softcap(1e40,1/3,0).softcap('ee4',1/3,0).softcap('e1.6e4',0.8,0,true)
            },
            effDesc(eff=this.effect()) { return "x"+format(eff)+" later" },
        },
        22: {
            unl() { return true },
            desc: "Lặp lại nhân bản mạnh gấp 2 lần.",
            cost: E(2.5e3),
        },
        23: {
            unl() { return true },
            desc: "Ngân hà Nhân bản mạnh hơn dựa trên số điểm Uy tín chưa được sử dụng.",
            cost: E(2.5e4),
            effect() {
                let ret = player.prestige.points.add(1).log10().add(1).pow(0.6)
                return ret.softcap(11,0.5,0)
            },
            effDesc(eff=this.effect()) { return format(eff.sub(1).mul(100))+"% stronger" },
        },
        24: {
            unl() { return true },
            desc: "Nâng cấp Uy tín số 5 được mũ bởi Ngân hà Nhân bản.",
            cost: E(5e5),
            effect() {
                let ret = player.rep_galaxy.add(1).root(3)
                return ret
            },
            effDesc(eff=this.effect()) { return "^"+format(eff) },
        },
        31: {
            unl() { return true },
            desc: "Làm chậm Nhân bản bắt đầu muộn hơn 1,15 lần cho mỗi OoM của Nhân bản.",
            cost: E(1e7),
            effect() {
                let ret = E(1.15).pow(player.replicanti.log10().softcap(FORMS.INF.log10(), 1/2, 0))
                if (player.prestige.upgrades.includes(41) && player.prestige.upgrades.includes(24)) ret = ret.pow(UPGS.prestige[24].effect())
                return ret
            },
            effDesc(eff=this.effect()) { return "x"+format(eff)+" later" },
        },
        32: {
            unl() { return true },
            desc: "ĐIểm Uy tín tự nhân chính nó.",
            cost: E(1e9),
            effect() {
                let ret = player.prestige.points.add(1).log10().add(1).pow(2)
                if (player.prestige.upgrades.includes(42)) ret = player.prestige.points.add(1).root(4)
                return ret
            },
            effDesc(eff=this.effect()) { return "x"+format(eff) },
        },
        33: {
            unl() { return true },
            desc: "Làm chậm Nhân bản bắt đầu ^1,15 muộn hơn.",
            cost: E(1e10),
        },
        34: {
            unl() { return true },
            desc: "Ngân hà Nhân bản mạnh hơn 1,5% cho mỗi OoM của Nhân bản.",
            cost: E(5e12),
            effect() {
                let ret = E(0.015).mul(player.replicanti.log10()).add(1)
                return ret.softcap(11,0.5,0)
            },
            effDesc(eff=this.effect()) { return format(eff.sub(1).mul(100))+"% stronger" },
        },
        41: {
            unl() { return true },
            desc: "Nâng cấp Uy tín số 8 có thể tăng cường Nâng cấp Uy tín số 9.",
            cost: E(1e14),
        },
        42: {
            unl() { return player.breakInf },
            desc: "Công thức của Nâng cấp Uy tín số 10 tốt hơn.",
            cost: E(1e36),
        },
        43: {
            unl() { return player.breakInf },
            desc: "Ngân hà Nhân bản rẻ hơn dựa trên Nhân bản.",
            cost: E(1e54),
            effect() {
                let ret = player.replicanti.root(4)
                return ret.softcap("e1500",0.5,0)
            },
            effDesc(eff=this.effect()) { return "/"+format(eff) },
        },
        44: {
            unl() { return player.breakInf && FORMS.replicanti.sacrifice.unl() },
            desc: "Hy sinh Nhân bản tăng cường số điểm Uy tín nhận được.",
            cost: E(1e120),
            effect() {
                let ret = E(2).pow(player.rep_sacrifice.pow(0.625))
                return ret
            },
            effDesc(eff=this.effect()) { return format(eff)+"x" },
        },
    },
    inf_rep: {
        cols: 1,
        can(x) { return player.inf.points.gte(this[x].cost()) },
        buy(x) {
            if (this.can(x)) {
                player.inf.points = player.inf.points.sub(this[x].cost())
                player.inf_rep_upgs[x] = player.inf_rep_upgs[x].add(1)
            }
        },
        buyMax() {
            for (let x = 1; x <= this.cols; x++) if (this.can(x)) {
                let bulk = this[x].bulk()
                if (bulk.gt(player.rep_upgs[x])) {
                    player.replicanti = player.replicanti.sub(this[x].cost(bulk.sub(1)))
                    player.rep_upgs[x] = bulk
                }
            }
        },
        1: {
            id: 1,
            title: "Hệ số nhân Nhân bản Vô hạn",
            cost(x=player.inf_rep_upgs[this.id]) { return E(1.5).pow(x.pow(player.inf.upgrades.includes(42)?1.25:1.5)).floor() },
            effect(x=player.inf_rep_upgs[this.id]) {
                let lvl = x
                if (player.inf.upgrades.includes(32)) lvl = lvl.add(UPGS.post_inf[32].effect())
                if (player.inf.upgrades.includes(13)) lvl = lvl.mul(UPGS.post_inf[13].effect())
                return lvl.mul(0.01).add(1)
            },
            desc(eff=this.effect()) { return `Nhân sản lượng Nhân bản Vô hạn ${format(eff)}x.` },
            bulk(x=player.replicanti) {
                if (x.lt(1)) return E(0)
                let bulk = x.logBase(1.5).root(player.inf.upgrades.includes(42)?1.25:1.5).add(1).floor()
                return bulk
            },
        },
    },
    post_inf: {
        cols: 4,
        rows: 4,
        can(x) { return player.inf.points.gte(this[x].cost) && !player.inf.upgrades.includes(x) },
        buy(x) {
            if (this.can(x)) {
                player.inf.points = player.inf.points.sub(this[x].cost)
                player.inf.upgrades.push(x)
            }
        },
        11: {
            unl() { return true },
            desc: "Làm chậm Nhân bản bắt đầu sau đó dựa trên số điểm Vô hạn chưa sử dụng.",
            cost: E(100),
            effect() {
                let ret = player.inf.points.add(1).pow(20)
                return ret.softcap(1e100,1/3,0)
            },
            effDesc(eff=this.effect()) { return "x"+format(eff)+" later" },
        },
        12: {
            unl() { return true },
            desc: "Điểm Vô hạn được tăng cường bởi số điểm Uy tín.",
            cost: E(500),
            effect() {
                let ret = player.prestige.points.add(1).log10().add(1)
                return ret
            },
            effDesc(eff=this.effect()) { return "x"+format(eff) },
        },
        13: {
            unl() { return true },
            desc: "Giữ các nâng cấp Uy tín khi khởi động lại. Hệ số nhân Nhân bản Vô hạn mạnh hơn dựa trên số lượng Nhân bản.",
            cost: E(2.5e4),
            effect() {
                let ret = player.replicanti.log10().add(1).log10().add(1)
                return ret
            },
            effDesc(eff=this.effect()) { return format(eff)+"x stronger" },
        },
        14: {
            unl() { return true },
            desc: "Làm chậm Nhân bản yếu hơn 15%",
            cost: E(2.5e5),
        },
        21: {
            unl() { return true },
            desc: "Công thức Ngân hà Nhân bản tốt hơn",
            cost: E(1e7),
        },
        22: {
            unl() { return FORMS.replicanti.sacrifice.unl() },
            desc: "Hy sinh Nhân bản tăng cường lượng Điểm Vô hạn nhận được.",
            cost: E(5e9),
            effect() {
                let ret = E(2).pow(player.rep_sacrifice.pow(0.3))
                return ret
            },
            effDesc(eff=this.effect()) { return format(eff)+"x" },
        },
        23: {
            unl() { return true },
            desc: "Giới hạn cứng Sản lượng Nhân bản bắt đầu muộn hơn dựa trên lượng Nhân bản.",
            cost: E(1e13),
            effect() {
                let ret = player.replicanti
                if (!player.inf.upgrades.includes(44)) ret = ret.min("e5000")
                else ret = ret.softcap('e5000',1/5,0)
                return ret
            },
            effDesc(eff=this.effect()) { return format(eff)+"x later" },
        },
        24: {
            unl() { return true },
            desc: "Loại bỏ hiệu ứng giới hạn mềm khỏi Infinity Replicanti.",
            cost: E(1e18),
        },
        31: {
            unl() { return true },
            desc: "Loại bỏ giới hạn mềm làm chậm Nhân bản.",
            cost: E(1e20),
        },
        32: {
            unl() { return true },
            desc: "Máy nén Vô hạn tăng Hệ số nhân Nhân bản Vô hạn miễn phí, và sự chống phát triển của Máy nén Vô hạn yếu hơn 50%.",
            cost: E(1e33),
            effect() {
                let ret = player.inf.comp
                return ret
            },
            effDesc(eff=this.effect()) { return "+"+format(eff,0) },
        },
        33: {
            unl() { return true },
            desc: "Làm chậm Nhân bản^2 bắt đầu muộn hơn dựa trên số điểm Uy tín chưa sử dụng.",
            cost: E(1e44),
            effect() {
                let ret = player.prestige.points.add(1)
                if (player.inf.upgrades.includes(43)) ret = ret.pow(UPGS.post_inf[43].effect())
                return ret
            },
            effDesc(eff=this.effect()) { return format(eff)+"x later" },
        },
        34: {
            unl() { return true },
            desc: "Máy nén Vô hạn tăng cường số điểm Vô hạn nhận được.",
            cost: E(1e63),
            effect() {
                let ret = E(10).pow(player.inf.comp.pow(1.5).mul(2).softcap(1e3,0.5,0))
                return ret
            },
            effDesc(eff=this.effect()) { return format(eff)+"x" },
        },
        41: {
            unl() { return player.replicator.unl },
            desc: "Máy Nhân bản tăng số điểm Vô hạn nhận được.",
            cost: E(5e64),
            effect() {
                let ret = player.replicator.amount.log10().mul(2).add(1)
                return ret.softcap(1e10,0.5,0)
            },
            effDesc(eff=this.effect()) { return format(eff)+"x" },
        },
        42: {
            unl() { return player.replicator.unl },
            desc: "Hệ số nhân Nhân bản Vô hạn có quy mô chi phí yếu hơn.",
            cost: E(1e83),
        },
        43: {
            unl() { return player.replicator.unl },
            desc: "Nâng cấp Vô hạn số 11 mạnh hơn dựa trên Máy Nhân bản.",
            cost: E(1e86),
            effect() {
                let ret = player.replicator.amount.log10().add(1).log10().add(1).root(3)
                return ret
            },
            effDesc(eff=this.effect()) { return "^"+format(eff) },
        },
        44: {
            unl() { return player.replicator.unl },
            desc: "Nâng cấp Vô hạn số 7 bị giới hạn mềm thay vì cứng.",
            cost: E(1e120),
        },
    },
}
