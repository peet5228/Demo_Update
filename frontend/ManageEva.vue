<template>
    <v-row class="mb-2">
        <v-col cols="12" md="4" class="ms-auto">
            <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="ค้นหาชื่อ, นามสกุล หรือชื่อผู้ใช้..." variant="outlined" ></v-text-field>
        </v-col>
    </v-row>
    <v-table>
    <thead>
        </thead>
    <tbody>
        <tr v-for="(items, index) in filteredResult" :key="items.id_member">
            <td class="text-center border">{{ index + 1 }}</td>
            <td class="text-center border">{{ items.first_name }} {{ items.last_name }}</td>
            <td class="text-center border">{{ items.email }}</td>
            <td class="text-center border">{{ items.username }}</td>
            <td class="text-center border">{{ items.role }}</td>
            <td class="text-center border">
                <v-btn class="text-white" size="small" color="warning" @click="Edit(items)">แก้ไข</v-btn>&nbsp;
                <v-btn class="text-white" size="small" color="error" @click="del(items.id_member)">ลบ</v-btn>
            </td>
        </tr>
        <tr v-if="filteredResult.length === 0">
            <td class="text-center border opacity-60" colspan="10">ไม่พบข้อมูลที่ค้นหา</td>
        </tr>
    </tbody>
</v-table>
</template>

<script>

const result = ref([])
const search = ref('') // 1. เพิ่มตัวแปรเก็บค่าที่พิมพ์ค้นหา

// 2. เพิ่ม Computed สำหรับกรองข้อมูล (ทำงาน Offline ได้ 100%)
const filteredResult = computed(() => {
    // ถ้าไม่มีการพิมพ์ค้นหา ให้คืนค่าข้อมูลทั้งหมด
    if (!search.value) return result.value

    const s = search.value.toLowerCase()
    return result.value.filter((item: any) => {
        return (
            item.first_name?.toLowerCase().includes(s) ||
            item.last_name?.toLowerCase().includes(s) ||
            item.username?.toLowerCase().includes(s) ||
            item.email?.toLowerCase().includes(s)
        )
    })
})

// ... โค้ดส่วนอื่นๆ (form, fetch, saveMember, del) เหมือนเดิม ...

</script>
