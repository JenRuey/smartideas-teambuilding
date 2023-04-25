import React from "react";
import { toast } from "react-toastify";
import { useDBContext } from "../context/dbContext";
import { MemberType } from "../tables/member";

export type MemberModalRef =
  | {
      Show: (grpKey: string, mb: Array<MemberType>) => void;
      Close: () => void;
    }
  | undefined;
type MemberModalPropType = {};

const MemberModal = React.forwardRef<MemberModalRef, MemberModalPropType>((_: MemberModalPropType, ref) => {
  let local_db = useDBContext();

  const [show, setShow] = React.useState<boolean>(false);
  const [key, setKey] = React.useState<string>("");
  const [members, setMembers] = React.useState<Array<MemberType>>([]);

  React.useImperativeHandle(
    ref,
    () => ({
      Show: (grpKey: string, mb: Array<MemberType>) => {
        setShow(true);
        setMembers(mb);
        setKey(grpKey);
      },
      Close: () => {
        setShow(false);
        setMembers([]);
        setKey("");
      },
    }),
    []
  );

  const addmember = () => {
    let newmemberinpt: HTMLElement | null = document.getElementById("newmembername");

    if (newmemberinpt && (newmemberinpt as HTMLInputElement).value) {
      let inpt = newmemberinpt as HTMLInputElement;
      let _members = [...members];
      _members.push({ membername: inpt.value, group: key, key: "" });
      setMembers(_members);
      inpt.value = "";
    } else {
      toast("Member Name is required.");
    }
  };

  const onSave = () => {
    local_db.member.updateitems(members);
    setShow(false);
  };

  const onDelete = (key: string) => {
    local_db.member.deleteall([key]);
    setMembers([...members].filter((o) => o.key !== key));
  };

  return show ? (
    <div>
      {members.map((item, index) => {
        return (
          <div key={item.key + "-" + index}>
            <input
              value={item.membername}
              onChange={(e) => {
                let _members = [...members];
                _members[index] = { ..._members[index], membername: e.target.value };
                setMembers(_members);
              }}
            />
            <button onClick={() => onDelete(item.key)}>delete</button>
          </div>
        );
      })}
      <input id={"newmembername"} />
      <button onClick={addmember}>add</button>
      <button onClick={() => setShow(false)}>close</button>
      <button onClick={onSave}>save</button>
    </div>
  ) : null;
});

export default MemberModal;
