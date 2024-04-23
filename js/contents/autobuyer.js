const AUTOS = {
    update() {
        for (let x = 1; x <= 4; x++) if (player.autobuyer[this[x].id]) UPGS.replicanti.max(x)
        if (player.autobuyer["auto_rg"]) FORMS.replicanti.galaxy.reset(true)
        if (player.autobuyer["auto_rsac"]) FORMS.replicanti.sacrifice.doSac()
        if (player.autobuyer["auto_ic"]) FORMS.inf.comp.reset()
    },
    length: 7,
    1: {
        dis: "Tự động mua Kho Nhân bản",
        id: "auto_rs",
        unl() { return FORMS.inf.seen() },
        see() { return player.chals.comps.includes("normal1") },
        see_desc: "Hoàn thành Thử thách số 1 để mở khóa.",
    },
    2: {
        dis: "Tự động mua Hệ số nhân Nhân bản",
        id: "auto_rm",
        unl() { return FORMS.inf.seen() },
        see() { return player.chals.comps.includes("normal2") },
        see_desc: "Hoàn thành Thử thách số 2 để mở khóa.",
    },
    3: {
        dis: "Tự động mua Sức mạnh Nhân bản",
        id: "auto_rp",
        unl() { return FORMS.inf.seen() },
        see() { return player.chals.comps.includes("normal3") },
        see_desc: "Hoàn thành Thử thách số 3 để mở khóa.",
    },
    4: {
        dis: "Tự động mua Nhân bản Lặp lại",
        id: "auto_rr",
        unl() { return FORMS.inf.seen() },
        see() { return player.chals.comps.includes("normal4") },
        see_desc: "Hoàn thành Thử thách số 4 để mở khóa.",
    },
    5: {
        dis: "Tự động mua Ngân hà Nhân bản",
        id: "auto_rg",
        unl() { return FORMS.inf.seen() },
        see() { return player.chals.comps.includes("normal5") },
        see_desc: "Hoàn thành Thử thách số 5 để mở khóa.",
    },
    6: {
        dis: "Tự động Hy sinh Nhân bản",
        id: "auto_rsac",
        unl() { return player.breakInf },
        see() { return player.chals.comps.includes("inf4") },
        see_desc: "Hoàn thành Thử thách Vô hạn số 4 để mở khóa.",
    },
    7: {
        dis: "Tự động mua Máy nén Vô hạn",
        id: "auto_ic",
        unl() { return player.breakInf },
        see() { return ACHS.has(48) },
        see_desc: `Có được thành tựu "Yes Lạm phát".`,
    },
}
