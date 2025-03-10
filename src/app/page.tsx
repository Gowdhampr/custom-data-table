"use client";

import Heading from "@/components/UI/Heading/Heading";
import Styles from "./page.module.css";
import DataTable from "@/components/DataTable/DataTable";

interface DeviceListType {
    id: number;
    name: string;
    status: "available" | "scheduled";
    device: string;
    path: string;
}

const DeviceList: DeviceListType[] = [
    {
        id: 1,
        name: "smss.exe",
        device: "Stark",
        path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
        status: "scheduled",
    },
    {
        id: 2,
        name: "netsh.exe",
        device: "Targaryen",
        path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
        status: "available",
    },
    {
        id: 3,
        name: "uxtheme.dll",
        device: "Lanniester",
        path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
        status: "available",
    },
    {
        id: 4,
        name: "cryptbase.dll",
        device: "Martell",
        path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
        status: "scheduled",
    },
    {
        id: 5,
        name: "7za.exe",
        device: "Baratheon",
        path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
        status: "scheduled",
    },
];

export default function Home() {
    const handleDownload = (selectedItems: DeviceListType[]) => {
        // Filter only available items
        const downloadedItems = selectedItems.map(({ name, device, path }) => ({
            name,
            device,
            path,
        }));

        /**
         * Since we need a formatted output
         * Manipulated the array of data into string format and added new line between each set of data
         */
        const message =
            `Downloaded Items\n` +
            downloadedItems
                .map(
                    (item) =>
                        `Name: ${item.name} Device: ${item.device} Path: ${item.path}`
                )
                .join("\n\n");

        alert(message);
    };

    return (
        <div className={Styles.page}>
            <main className={Styles.main}>
                <Heading text="Datagrid" />
                <DataTable
                    data={DeviceList}
                    columns={[
                        { key: "name", header: "Name" },
                        { key: "device", header: "Device" },
                        {
                            key: "path",
                            header: "Path",
                        },
                        {
                            key: "status",
                            header: "Status",
                            render: (value, item) => (
                                <div className={Styles.statusContainer}>
                                    {item.status === "available" && (
                                        <div className={Styles.statusDot}></div>
                                    )}
                                    {value}
                                </div>
                            ),
                        },
                    ]}
                    isRowDownloadable={(item) => item.status === "available"}
                    onClickDownload={handleDownload}
                />
            </main>
        </div>
    );
}
