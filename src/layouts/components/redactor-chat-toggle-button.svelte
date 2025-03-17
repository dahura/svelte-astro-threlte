<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { MessageSquare } from 'lucide-svelte'

  interface RedactorChatToggleButtonProps {
    isChatVisible: boolean
  }

  let { isChatVisible = $bindable(false) }: RedactorChatToggleButtonProps = $props()

  const handleChatToggle = () => {
    isChatVisible = !isChatVisible
  }
</script>

<div class="fixed z-20 left-4 bottom-4">
  <Button
    variant="outline"
    size="icon"
    class="w-10 h-10 transition-shadow rounded-full shadow-md hover:shadow-lg"
    onclick={handleChatToggle}
  >
    <MessageSquare class={`w-5 h-5 ${!isChatVisible ? 'animate-pulse' : ''}`} />
  </Button>
</div>
