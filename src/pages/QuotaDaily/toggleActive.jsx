import React, { useEffect, useState } from 'react';
import { EuiSwitch } from '@elastic/eui';
import dailyQuotaService from '../../services/dailyQuotaService';

const ToggleActive = ({ row }) => {
    const [isChecked, setIsChecked] = useState(row.isActive);

    // Synchronize isChecked with row.isActive
    useEffect(() => {
        setIsChecked(row.isActive);
    }, [row.isActive]);

    const handleToggle = async () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        
        try {
            const update = await dailyQuotaService.updateData({ active: newChecked, unitNo: row.unitNo });
            if (update.status === 200) {
                console.log("Update successful");
            } else {
                console.log("Try again");
                // Optionally revert the toggle state if the update fails
                setIsChecked(isChecked);
            }
        } catch (error) {
            console.log("Error:", error);
            // Optionally revert the toggle state if an error occurs
            setIsChecked(isChecked);
        }
    };

    return (
        <div>
            <EuiSwitch
                checked={isChecked}
                onChange={handleToggle}
                label={row.unitNo} // Optional label for better accessibility
            />
        </div>
    );
};

export default ToggleActive;
