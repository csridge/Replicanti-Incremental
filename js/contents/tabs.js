const TABS = {
    choose(x, stab=false) {
        if (!stab && player.tab[0] != x) player.tab[1] = 0
        player.tab[stab?1:0] = x
    },
    1: [
        { id: "Nhân bản" },
        { id: "Tùy chọn" },
        { id: "Thống kê" },
        { id: "Thành tựu" },
        { id: "Tự động mua", unl() { return FORMS.inf.seen() } },
        { id: "Thử thách", unl() { return FORMS.inf.seen() }, notify() { return CHALS.inf.canUnlock() } },
        { id: "Vô hạn", seen() { return FORMS.inf.seen() }, style: "inf", notify() { return FORMS.inf.comp.can() } },
        { id: "Vĩnh cửu", unl() { return FORMS.inf.seen() }, seen() { return false }, style: "eter" },
        { id: "Thiên hà", unl() { return false }, seen() { return false }, style: "gal" },
    ],
    2: {
        0: [
            { id: "Nhân bản" },
            { id: "Uy tín", seen() { return FORMS.prestige.seen() }, style: "prestige" },
        ],
        2: [
            { id: "Trang chính" },
            { id: "Kỷ lục Thử thách", unl() { return FORMS.inf.seen() } },
        ],
        5: [
            { id: "Thử thách" },
            { id: "Thử thách Vô hạn", unl() { return player.breakInf }, style: "inf", notify() { return CHALS.inf.canUnlock() } },
        ],
        6: [
            { id: "Ngân hà Vô hạn", notify() { return FORMS.inf.comp.can() } },
            { id: "Phá vỡ Vô hạn", unl() { return FORMS.inf.break.seen() } },
            { id: "Máy Nhân bản", unl() { return FORMS.inf.break.seen() } },
        ],
    },
}
