import { useEffect, useState } from "react";
import { AlignLeftIcon, BoldIcon, ItalicIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { Switch } from "@/components/ui/Switch";
import { Textarea } from "@/components/ui/Textarea";

export default function App() {
    const [dark, setDark] = useState(false);
    const [checked, setChecked] = useState(true);
    const [enabled, setEnabled] = useState(true);
    const [volume, setVolume] = useState([48]);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    return (
        <div className="min-h-svh bg-background text-foreground">
            <header className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                    <p className="text-sm font-medium">Component Library</p>
                    <p className="text-sm text-muted-foreground">
                        Customizable wrappers over shadcn
                    </p>
                </div>
                <label className="flex items-center gap-2 text-sm">
                    Dark mode
                    <Switch checked={dark} onCheckedChange={setDark} />
                </label>
            </header>

            <main className="mx-auto grid max-w-4xl gap-8 p-6">
                <section className="grid gap-3">
                    <h2 className="text-sm font-medium text-muted-foreground">
                        Button
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="link">Link</Button>
                    </div>
                </section>

                <section className="grid gap-3">
                    <h2 className="text-sm font-medium text-muted-foreground">
                        Button group
                    </h2>
                    <ButtonGroup>
                        <Button variant="outline">
                            <BoldIcon />
                        </Button>
                        <Button variant="outline">
                            <ItalicIcon />
                        </Button>
                        <Button variant="outline">
                            <AlignLeftIcon />
                        </Button>
                    </ButtonGroup>
                </section>

                <section className="grid gap-3">
                    <h2 className="text-sm font-medium text-muted-foreground">
                        Badge
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                    </div>
                </section>

                <section className="grid max-w-md gap-3">
                    <h2 className="text-sm font-medium text-muted-foreground">
                        Input
                    </h2>
                    <Input placeholder="Email address" type="email" />
                </section>

                <section className="grid max-w-md gap-3">
                    <h2 className="text-sm font-medium text-muted-foreground">
                        Textarea
                    </h2>
                    <Textarea placeholder="Write a short note..." />
                </section>

                <section className="grid max-w-md gap-3">
                    <h2 className="text-sm font-medium text-muted-foreground">
                        Checkbox
                    </h2>
                    <label className="flex items-center gap-2 text-sm">
                        <Checkbox
                            checked={checked}
                            onCheckedChange={(value) =>
                                setChecked(value === true)
                            }
                        />
                        Subscribe to updates
                    </label>
                </section>

                <section className="grid max-w-md gap-3">
                    <h2 className="text-sm font-medium text-muted-foreground">
                        Switch
                    </h2>
                    <label className="flex items-center gap-2 text-sm">
                        <Switch
                            checked={enabled}
                            onCheckedChange={setEnabled}
                        />
                        Notifications {enabled ? "on" : "off"}
                    </label>
                </section>

                <section className="grid max-w-md gap-3">
                    <h2 className="text-sm font-medium text-muted-foreground">
                        Slider
                    </h2>
                    <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                    />
                    <p className="text-sm text-muted-foreground">
                        Value: {volume[0]}
                    </p>
                </section>
            </main>
        </div>
    );
}
