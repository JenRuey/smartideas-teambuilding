import React from "react";
import { toast } from "react-toastify";
import { MemberType } from "../tables/member";

export type MemberModalRef =
  | {
      Show: (grpKey: string, mb: Array<MemberType>) => void;
      Close: () => void;
    }
  | undefined;
type MemberModalPropType = {};

const MemberModal = React.forwardRef<MemberModalRef, MemberModalPropType>((_: MemberModalPropType, ref) => {
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
      let _members = [...members];
      _members.push({ membername: (newmemberinpt as HTMLInputElement).value, group: key, key: "" });
      setMembers(_members);
    } else {
      toast("Member Name is required.");
    }
  };

  return show ? (
    <div>
      {members.map((item, index) => {
        return <div key={item.key + "-" + index}>{item.membername}</div>;
      })}
      <input id={"newmembername"} />
      <button onClick={addmember}>add</button>
      <button onClick={() => setShow(false)}>close</button>
    </div>
  ) : null;
});

export default MemberModal;
