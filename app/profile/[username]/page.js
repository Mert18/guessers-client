"use client";
import { getSelfBetSlips } from "@/api/bet";
import PlacedBetSlip from "@/components/betslip/PlacedBetSlip";
import ComponentWithHeader from "@/components/common/ComponentWithHeader";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const User = () => {
  const { data: session } = useSession();
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [selfBetSlips, setSelfBetSlips] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    getSelfBetSlips(paging).then((response) => {
      setSelfBetSlips(response.data.content);
    });
  }, [session]);
  return (
    <div className="">
      {/* List Bet Slips */}
      <ComponentWithHeader name={t("betSlips")}>
        <div className="w-full">
          <ul>
            {selfBetSlips.map((betSlip) => {
              return <PlacedBetSlip betSlip={betSlip} key={betSlip.id} />;
            })}
          </ul>
        </div>
      </ComponentWithHeader>
    </div>
  );
};
export default User;
