import React from "react";
import { Button, Modal } from "react-bootstrap";
import { BiUserPlus, BiUserX } from "react-icons/bi";
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

  const closeModal = () => {
    setShow(false);
    setMembers([]);
    setKey("");
  };

  React.useImperativeHandle(
    ref,
    () => ({
      Show: (grpKey: string, mb: Array<MemberType>) => {
        setShow(true);
        setMembers(mb);
        setKey(grpKey);
      },
      Close: closeModal,
    }),
    []
  );

  const onAdd = () => {
    let newmemberinpt: HTMLElement | null = document.getElementById("newmembername");

    if (newmemberinpt && (newmemberinpt as HTMLInputElement).value) {
      let inpt = newmemberinpt as HTMLInputElement;
      local_db.member.addall([{ membername: inpt.value, group: key }]);
      setMembers(local_db.member.filterall([{ attribute: "group", text: key }]));
      inpt.value = "";
    } else {
      toast("Member Name is required.");
    }
  };

  const onDelete = (k: string) => {
    local_db.member.deleteall([k]);
    setMembers(local_db.member.filterall([{ attribute: "group", text: key }]));
  };

  const onSave = () => {
    local_db.member.updateitems(members);
    closeModal();
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{"Manage Members"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((item, index) => {
              return (
                <tr key={item.key + "-" + index}>
                  <td>
                    <input
                      value={item.membername}
                      onChange={(e) => {
                        let _members = [...members];
                        _members[index] = { ..._members[index], membername: e.target.value };
                        setMembers(_members);
                      }}
                    />
                  </td>
                  <td>
                    <button onClick={() => onDelete(item.key)}>
                      <BiUserX />
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>
                <input id={"newmembername"} />
              </td>
              <td>
                <button onClick={onAdd}>
                  <BiUserPlus />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSave}>
          {"Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default MemberModal;
