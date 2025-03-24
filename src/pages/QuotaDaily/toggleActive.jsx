import React, { useEffect, useState } from 'react';
import { EuiSwitch } from '@elastic/eui';
import dailyQuotaService from '../../services/dailyQuotaService';

const ToggleActive = ({ row }) => {
    const [isChecked, setIsChecked] = useState(row.is_active || false);

    useEffect(() => {
        setIsChecked(row.is_active);
    }, [row.is_active]);

    const handleToggle = async () => {
        try {
            const newChecked = !isChecked;
            setIsChecked(newChecked);
            const update = await dailyQuotaService.updateData({ active: newChecked, unit_no: row.unit_no, date: row.date });
            if (update.status !== '200') {
                setIsChecked(update.data);
                console.error("Failed to update status");
            }
        } catch (error) {
            console.error("Error:", error);
            setIsChecked(isChecked);
        }
    };

    return (
        <div>
            <EuiSwitch
            label={""}
                checked={isChecked}
                onChange={handleToggle}
            />
        </div>
    );
};

export default ToggleActive;
