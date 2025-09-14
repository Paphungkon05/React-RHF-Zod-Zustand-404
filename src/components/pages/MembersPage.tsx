import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, Pencil } from "lucide-react";

const MemberSchema = z.object({
  prefix: z.enum(["นาย", "นาง", "นางสาว"] as const),
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  photo: z
    .any()
    .refine(
      (file) => file instanceof FileList && file.length === 1,
      "กรุณาอัปโหลดรูป 1 รูป"
    ),
  workHistory: z.string().min(1, "กรุณากรอกประวัติการทำงาน"),
  achievements: z.string().min(1, "กรุณากรอกผลงานที่ผ่านมา"),
  ministry: z.string().min(1, "กรุณากรอกตำแหน่ง/กระทรวง"),
  party: z.string().min(1, "กรุณากรอกพรรคการเมือง"),
});

type MemberForm = z.infer<typeof MemberSchema>;
type Member = Omit<MemberForm, "photo"> & { id: string; photoUrl: string };

const uid = () => Math.random().toString(36).slice(2, 9);

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const { register, handleSubmit, reset, watch, setValue } = useForm<MemberForm>(
    { resolver: zodResolver(MemberSchema) }
  );

  const files = watch("photo");
  const previewUrl = useMemo(
    () => (files instanceof FileList && files[0] ? URL.createObjectURL(files[0]) : ""),
    [files]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onSubmit = (data: MemberForm) => {
    const file = (data.photo as FileList)[0];
    const photoUrl = URL.createObjectURL(file);

    if (editId) {
      setMembers((prev) =>
        prev.map((m) => (m.id === editId ? { ...m, ...data, photoUrl } : m))
      );
      setEditId(null);
    } else {
      setMembers((prev) => [...prev, { id: uid(), ...data, photoUrl }]);
    }
    reset();
  };

  const onEdit = (m: Member) => {
    setEditId(m.id);
    setValue("prefix", m.prefix);
    setValue("firstName", m.firstName);
    setValue("lastName", m.lastName);
    setValue("workHistory", m.workHistory);
    setValue("achievements", m.achievements);
    setValue("ministry", m.ministry);
    setValue("party", m.party);
  };

  const onDelete = (id: string) =>
    setMembers((prev) => prev.filter((m) => m.id !== id));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        ทำเนียบรายชื่อสมาชิกสภาผู้แทนราษฎร
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 bg-white p-6 rounded-xl shadow-lg border"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <select {...register("prefix")} className="border rounded p-2">
            <option value="">คำนำหน้า</option>
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </select>
          <input {...register("firstName")} placeholder="ชื่อ" className="border rounded p-2" />
          <input {...register("lastName")} placeholder="นามสกุล" className="border rounded p-2" />
          <input type="file" accept="image/*" {...register("photo")} className="border rounded p-2" />
        </div>
        {previewUrl && (
          <img
            src={previewUrl}
            className="h-20 w-20 object-cover rounded-lg border"
          />
        )}
        <textarea
          {...register("workHistory")}
          placeholder="ประวัติการทำงาน"
          className="border rounded p-2 w-full"
        />
        <textarea
          {...register("achievements")}
          placeholder="ผลงานที่ผ่านมา"
          className="border rounded p-2 w-full"
        />
        <input
          {...register("ministry")}
          placeholder="ตำแหน่ง/กระทรวง"
          className="border rounded p-2 w-full"
        />
        <input
          {...register("party")}
          placeholder="พรรคการเมือง"
          className="border rounded p-2 w-full"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {editId ? "บันทึกการแก้ไข" : "เพิ่มสมาชิก"}
        </button>
      </form>

      {/* List */}
      <div className="mt-6 space-y-2">
        {members.map((m) => (
          <div
            key={m.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={m.photoUrl}
                className="h-16 w-16 object-cover rounded-full border"
              />
              <div>
                <p className="font-semibold">
                  {m.prefix} {m.firstName} {m.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  {m.party} • {m.ministry}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(m)}
                className="px-3 py-1 bg-yellow-400 text-white rounded"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => onDelete(m.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
